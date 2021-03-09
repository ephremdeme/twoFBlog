import React from 'react'
import { useRouteMatch, BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import ProductListPage from './ProductList'
import ProductDeatilPage from './ProductDetial'
import UpdateProjectPage from './UpdateProduct'
import CreateProductPage from './CreateProduct'

const Product = () => {

  const { path } = useRouteMatch()

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path={`${path}`} component={ProductListPage} />
          <Route path={`${path}/:id/detail`} component={ProductDeatilPage} />
          <Route path={`${path}/:id/update`} component={UpdateProjectPage} />
          <Route path={`${path}/create`} component={CreateProductPage} />
        </Switch>
      </Router>
    </div>
  )
}

export default Product
