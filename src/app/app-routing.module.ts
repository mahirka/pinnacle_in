import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginActivate } from './providers/loginActivate';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),canActivate: [LoginActivate]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),canActivate: [LoginActivate]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),canActivate: [LoginActivate]
  },
  {
    path: 'booking-details/:id',
    loadChildren: () => import('./booking-details/booking-details.module').then( m => m.BookingDetailsPageModule),canActivate: [LoginActivate]
  },
  {
    path: 'check-in-details',
    loadChildren: () => import('./check-in-details/check-in-details.module').then( m => m.CheckInDetailsPageModule),canActivate: [LoginActivate]
  },
  {
    path: 'checkout-details',
    loadChildren: () => import('./checkout-details/checkout-details.module').then( m => m.CheckoutDetailsPageModule),canActivate: [LoginActivate]
  },
  {
    path: 'thankyou',
    loadChildren: () => import('./thankyou/thankyou.module').then( m => m.ThankyouPageModule),canActivate: [LoginActivate]
  },
  {
    path: 'transaction',
    loadChildren: () => import('./transaction/transaction.module').then( m => m.TransactionPageModule),canActivate: [LoginActivate]
  },
  {
    path: 'add-transaction',
    loadChildren: () => import('./add-transaction/add-transaction.module').then( m => m.AddTransactionPageModule),canActivate: [LoginActivate]
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule),canActivate: [LoginActivate]
  },
  {
    path: 'add-products',
    loadChildren: () => import('./add-products/add-products.module').then( m => m.AddProductsPageModule),canActivate: [LoginActivate]
  },
  {
    path: 'purchase-request',
    loadChildren: () => import('./purchase-request/purchase-request.module').then( m => m.PurchaseRequestPageModule),canActivate: [LoginActivate]
  },
  {
    path: 'request-view',
    loadChildren: () => import('./request-view/request-view.module').then( m => m.RequestViewPageModule),canActivate: [LoginActivate]
  },
  {
    path: 'stock-list',
    loadChildren: () => import('./stock-list/stock-list.module').then( m => m.StockListPageModule),canActivate: [LoginActivate]
  },
  {
    path: 'view-prodcuts',
    loadChildren: () => import('./view-prodcuts/view-prodcuts.module').then( m => m.ViewProdcutsPageModule),canActivate: [LoginActivate]
  },
  {
    path: 'products-view/:id',
    loadChildren: () => import('./products-view/products-view.module').then( m => m.ProductsViewPageModule),canActivate: [LoginActivate]
  },

  {
    path: 'view-prodcuts',
    loadChildren: () => import('./view-prodcuts/view-prodcuts.module').then( m => m.ViewProdcutsPageModule),canActivate: [LoginActivate]
  },

  {
    path: 'feedback-modal',
    loadChildren: () => import('./feedback-modal/feedback-modal.module').then( m => m.FeedbackModalPageModule),canActivate: [LoginActivate]
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule),canActivate: [LoginActivate]
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule),canActivate: [LoginActivate]
  },
  {
    path: 'create-category',
    loadChildren: () => import('./create-category/create-category.module').then( m => m.CreateCategoryPageModule),canActivate: [LoginActivate]
  },
  {
    path: 'add-new-products',
    loadChildren: () => import('./add-new-products/add-new-products.module').then( m => m.AddNewProductsPageModule),canActivate: [LoginActivate]
  },
  {
    path: 'booking-success',
    loadChildren: () => import('./booking-success/booking-success.module').then( m => m.BookingSuccessPageModule)
  },
  {
    path: 'create-products',
    loadChildren: () => import('./create-products/create-products.module').then( m => m.CreateProductsPageModule)
  },
  {
    path: 'rooms-list',
    loadChildren: () => import('./rooms-list/rooms-list.module').then( m => m.RoomsListPageModule)
  },
  {
    path: 'rooms-view/:id',
    loadChildren: () => import('./rooms-view/rooms-view.module').then( m => m.RoomsViewPageModule)
  },
  {
    path: 'booking-request-list',
    loadChildren: () => import('./booking-request-list/booking-request-list.module').then( m => m.BookingRequestListPageModule)
  },
  {
    path: 'feedback-questions-list',
    loadChildren: () => import('./feedback-questions-list/feedback-questions-list.module').then( m => m.FeedbackQuestionsListPageModule)
  },
  {
    path: 'booking-request-view/:id',
    loadChildren: () => import('./booking-request-view/booking-request-view.module').then( m => m.BookingRequestViewPageModule)
  },
  {
    path: 'finance-category',
    loadChildren: () => import('./finance-category/finance-category.module').then( m => m.FinanceCategoryPageModule)
  },
  {
    path: 'finance-category-add',
    loadChildren: () => import('./finance-category-add/finance-category-add.module').then( m => m.FinanceCategoryAddPageModule)
  },
  {
    path: 'transaction-list',
    loadChildren: () => import('./transaction-list/transaction-list.module').then( m => m.TransactionListPageModule)
  },
  {
    path: 'transaction-add',
    loadChildren: () => import('./transaction-add/transaction-add.module').then( m => m.TransactionAddPageModule)
  },
  {
    path: 'product-categories',
    loadChildren: () => import('./product-categories/product-categories.module').then( m => m.ProductCategoriesPageModule)
  },
  {
    path: 'product-category-add',
    loadChildren: () => import('./product-category-add/product-category-add.module').then( m => m.ProductCategoryAddPageModule)
  },
  {
    path: 'product-list',
    loadChildren: () => import('./product-list/product-list.module').then( m => m.ProductListPageModule)
  }

]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
