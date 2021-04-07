import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAV9dzI5S4tOuLyc0pcotwYyKJN2WdVdhA",
    authDomain: "store-db-7599e.firebaseapp.com",
    projectId: "store-db-7599e",
    storageBucket: "store-db-7599e.appspot.com",
    messagingSenderId: "691898392249",
    appId: "1:691898392249:web:db7b100b64ee7f6953c568"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData)=>{
    
    if (!userAuth) return;

    //console.log('esto es user autth',!userAuth)

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){

        //console.log('esto es el snap',snapShot.exists)
        //console.log(userRef)
        const {displayName, email } = userAuth;
        const createAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData
            })
        }catch(error){
            console.log('error creating user', error.message);

        }
    }
    return userRef
}

export const addCollectionsAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef)

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        //Crea un nuevo documento es esta coleccion y le asigna un Id automatico
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    })

    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
      const { title, items } = doc.data();
  
      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      };
    });
  
    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, {});
  };

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({promt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;