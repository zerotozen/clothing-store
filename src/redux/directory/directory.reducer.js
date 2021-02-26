const INITIAL_STATE = {
    sections:[
        {
          title: 'hats',
          //imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
          imageUrl: 'https://cdn.pixabay.com/photo/2017/05/13/12/40/fashion-2309519_1280.jpg',
          id: 1,
          linkUrl: 'shop/hats'
        },
        {
          title: 'jackets',
          //imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
          imageUrl: 'https://cdn.pixabay.com/photo/2015/01/16/15/01/fashion-601553_1280.jpg',
          id: 2,
          linkUrl: 'shop/jackets'
        },
        {
          title: 'sneakers',
          //imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
          imageUrl: 'https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_1280.jpg',
          id: 3,
          linkUrl: 'shop/sneakers'
        },
        {
          title: 'womens',
          //imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
          imageUrl: 'https://cdn.pixabay.com/photo/2016/01/19/17/48/woman-1149911_1280.jpg',
          size: 'large',
          id: 4,
          linkUrl: 'shop/womens'
        },
        {
          title: 'mens',
          imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
          size: 'large',
          id: 5,
          linkUrl: 'shop/mens'
        }]
};

const directoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        default:
            return state;
    }
}

export default directoryReducer;