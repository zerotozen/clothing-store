import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';



import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectoinPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component{
    constructor(){
        super()

        this.state = {
            loading:true
        }
    }

    unsiscribeFromSnapshot = null;

    componentDidMount(){
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections')
        //now we want to get this data
        collectionRef.onSnapshot( async snapshot => {
            //console.log('esto son los datos',snapshot   )
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
            updateCollections(collectionsMap);
            this.setState({ loading:false });
        } )
    }
   
    render(){
        const { match } = this.props;
        const { loading } = this.state;
        return(
            <div className='shop-page'>
            <Route 
                exact 
                path={`${match.path}`} 
                render={props => (
                <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>
                )}
            />
            <Route 
                path={`${match.path}/:collectionId`} 
            //component={CollectionPage}/>    
                render={props => (
                <CollectoinPageWithSpinner isLoading={loading} {...props}/>
                )}
            />
        </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => 
        dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);