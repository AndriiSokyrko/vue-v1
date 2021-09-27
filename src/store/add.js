import fb from  'firebase'
class Ads {
    // constructor(payload.id, payload.title, payload.subtitle, payload.description, payload.url, payload.promo=true ,payload.ownerId){
    constructor(payload){

    this.id =payload.id
    this.title = payload.title
    this.subtitle =payload.subtitle
    this.description =payload.description
    this.imageUrl =payload.imageUrl
    this.promo =payload.promo
    this.ownerId =payload.ownerId
    }
}
export default{
    state: {
        ads: [
            // {id:1, promo: true, title:'Top western animals', subtitle:'Top western road trips',src:'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg', description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, sint!'},
            // {id:2, promo: false, title:'Top western sky', subtitle:'Top western road trips',src:'https://cdn.vuetifyjs.com/images/carousel/sky.jpg', description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, sint!'},
            // {id:3, promo: true, title:'Top western moon', subtitle:'Top western road trips', src:'https://cdn.vuetifyjs.com/images/carousel/bird.jpg', description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, sint!'},
            // {id:4, promo: true, title:'Top western birds', subtitle:'Top western road trips', src:'https://cdn.vuetifyjs.com/images/carousel/planet.jpg', description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, sint!'}
        ],
    },
    mutations: {
        createAd(state, payload){
            state.ads.push(payload)
        },
        loadAds(state, payload){
            state.ads= payload
        },
        updateStoreAd(state, payload){
            const ad = state.ads.find(a => a.id === payload.id )
            ad.id = payload.id
            ad.title = payload.title
            ad.subtitle = payload.subtitle
            ad.description = payload.description
            ad.imageUrl = payload.imageUrl
            ad.promo = payload.promo
            ad.ownerId = payload.ownerId
        }
        },
    actions: {
        async createAd({ commit, getters }, payload){
            commit('setClearError')
            commit('setLoading', true)
            try {
                const ownerId = getters.getUser.id;
                payload.ownerId = ownerId
                payload.id = null
                const  ad = await fb.database().ref('ads').push(new Ads(payload))
                payload.id = ad.key

                const imageExt = payload.image.name.slice(payload.image.name.lastIndexOf('.'))
                // let isExistImage = false
                // fb.storage().ref('ads').child(`${ payload.id }${ imageExt }`).getDownloadURL()
                //     .then(() => {
                //         isExistImage = true
                //     })
              // if (isExistImage)
                  await fb.storage().ref(`ads/${ad.key}${imageExt}`).put(payload.image)


                await fb.storage().ref('ads').child(`${ ad.key }${ imageExt }`).getDownloadURL()
                    .then((url) => {
                                  fb.database().ref('ads').child(ad.key)
                                    .update({'imageUrl':url,
                                    'id': ad.key, 'ownerId': ownerId})
                        payload.imageUrl = url
                    })

                commit('createAd', payload)
                commit('setLoading', false)

            } catch(error){
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        },

        async updateAd({ commit }, payload){
            commit('setClearError')
            commit('setLoading', true)
            try {
                if (payload.image !== '') {
                    const imageExt = payload.image.name.slice(payload.image.name.lastIndexOf('.'))
                    await fb.storage().ref(`ads/${payload.id}${imageExt}`).put(payload.image)

                    fb.storage().ref('ads').child(`${payload.id}${imageExt}`).getDownloadURL()
                    .then((url) => {
                        fb.database().ref('ads').child(payload.id)
                            .update({
                                'id': payload.id,
                                'title': payload.title,
                                'subtitle': payload.subtitle,
                                'description': payload.description,
                                'imageUrl': url,
                                'promo': payload.promo,
                            })
                        payload.imageUrl = url
                    })
                } else
                {
                    const getVal = await fb.database().ref('ads').child(payload.id).once('value')
                    const linkImg = getVal.val().imageUrl;
                    payload.imageUrl = linkImg

                }
                commit('updateStoreAd',  payload )
                commit('setLoading', false )

            } catch(error){
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        },

        async fetchAds({ commit }){
            commit('setClearError')
            commit('setLoading', true)
            try {
                const fbVal = await fb.database().ref('ads').once('value')
                const ads = fbVal.val()
                const resultFetch =[]
                // const ownerId = getters.getUser.id
                // console.log(ownerId)
                Object.keys( ads ).forEach(key=> {
                    // if (key.id === ownerId) {
                        const ad =ads[key]
                       resultFetch.push( new Ads(ad))
                    // }
                })


                commit('loadAds', resultFetch )
                commit('setLoading', false)

            } catch(error){
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        }
    },
    getters: {
        getAdds: state =>  state.ads  ,
        getAddsPromo: state=> state.ads.filter( ad =>  ad.promo ),
        getMyAdds: (state, getters) => state.ads.filter( ad => ad.ownerId === getters.getUser.id) ,
        getByIdAdds: state => fId => state.ads.find( ad => ad.id == fId),
        getOwnerId: ()=> fb.auth().currentUser.getIdToken().then(id=>id)

    }
}
