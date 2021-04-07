import React from 'react';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';

//import { updateCollections } from '../../redux/shop/shop.actions';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selector';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

//import CollectionsOverview from '../../components/collection-overview/collection-overview.component';
import CollectionsOverviewContainer from '../../components/collection-overview/collections-overview.container';
//import CollectionPage from '../collection/collection.component';
import CollectionPageContainer from '../collection/collection.container';

//const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
//const CollectoinPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component{

    unsiscribeFromSnapshot = null;

    componentDidMount(){
        //const { updateCollections } = this.props;
        //const collectionRef = firestore.collection('collections')
        //now we want to get this data
        //collectionRef.onSnapshot( async snapshot => {
            //console.log('esto son los datos',snapshot   )
            //const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
            //updateCollections(collectionsMap);
            //this.setState({ loading:false });
        //} )

        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();
    }
   
    render(){
        const { match, isCollectionsLoaded } = this.props;
        //const { loading } = this.state;
        return(
            <div className='shop-page'>
            <Route 
                exact 
                path={`${match.path}`} 
                component={CollectionsOverviewContainer}
            />
            <Route 
                path={`${match.path}/:collectionId`} 
                component={CollectionPageContainer} 
                //render={props => (
                //<CollectoinPageWithSpinner isLoading={!isCollectionsLoaded} {...props}/>
                //)}
            />
        </div>
        );
    }
}


//we dont need anymore here mapDispatchToProps
const mapDispatchToProps = dispatch => ({
    //updateCollections: collectionsMap => 
        //dispatch(updateCollections(collectionsMap))
        fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(null, mapDispatchToProps)(ShopPage);