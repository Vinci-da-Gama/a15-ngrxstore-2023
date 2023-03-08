import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { NoFoundComponent } from 'src/modules/share/shareComponents/no-found/no-found.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth' },
  {
    path: 'auth',
    loadChildren: () =>
      import('../modules/authen/authen.module').then((m) => m.AuthenModule),
  },
  { path: '**', redirectTo: '/no-found' },
  {
    path: 'no-found',
    component: NoFoundComponent,
    data: { message: 'Messsage from route data -- Page not found.' },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
      // initialNavigation: 'enabled', // it is for SSR
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

/* useHash, preloadingStrategy, and initialNavigation are options that can be passed to the RouterModule.forRoot() method when defining the application's routing configuration.

useHash: This option specifies whether to use the hash (#) sign for routing. When this option is set to true, the application uses the hash-based routing strategy, which means that the router uses the URL fragment to navigate to different parts of the application. This option is useful for web servers that do not support HTML5 pushState.

preloadingStrategy: This option specifies the preloading strategy to use for lazy-loaded modules. When a module is lazy-loaded, it is not immediately downloaded when the application is first loaded. Instead, it is downloaded on demand when the user navigates to a route that requires it. The preloading strategy allows you to preload lazy-loaded modules in the background, so that they are available more quickly when the user navigates to them. The PreloadAllModules strategy preloads all lazy-loaded modules, while other strategies, such as NoPreloading and SelectivePreloadingStrategy, allow you to customize the preloading behavior.

initialNavigation: It is for server side rendring(ssr). This option specifies how to handle the initial navigation when the application is first loaded. By default, the router waits for the browser to finish rendering before it starts the initial navigation. This can cause a delay in loading the first page of the application. Setting this option to 'enabled' causes the router to start the initial navigation immediately, which can improve the perceived performance of the application.

In the example provided, the RouterModule.forRoot() method is called with useHash set to true, preloadingStrategy set to PreloadAllModules, and initialNavigation set to 'enable'. This means that the application will use hash-based routing, preload all lazy-loaded modules in the background, and start the initial navigation immediately when the application is first loaded. The exports array with RouterModule is used to make the RouterModule available for use in other parts of the application.

useHash、preloadingStrategy和initialNavigation是定义应用程序的路由配置时可以传递给RouterModule.forRoot()方法的选项。

useHash。这个选项指定了是否使用哈希（#）符号进行路由配置。当这个选项被设置为 "true "时，应用程序使用基于哈希值的路由策略，这意味着路由器使用URL片段来导航到应用程序的不同部分。这个选项对于不支持HTML5推送状态的Web服务器很有用。

preloadingStrategy: 这个选项指定了用于懒惰加载的模块的预加载策略。当一个模块被lazy-loaded时，它不会在应用程序第一次被加载时立即被下载。相反，当用户导航到一个需要它的路线时，它将按需下载。预加载策略允许你在后台预加载懒惰加载的模块，这样，当用户导航到这些模块时，它们就能更快地被使用。PreloadAllModules策略可以预加载所有懒惰的模块，而其他策略，如NoPreloading和SelectivePreloadingStrategy，允许你自定义预加载行为。

initialNavigation。这个选项指定了在应用程序首次加载时如何处理初始导航。默认情况下，路由器在开始初始导航之前会等待浏览器完成渲染。这可能会导致加载应用程序的第一页时出现延迟。把这个选项设置为 "启用 "会使路由器立即开始初始导航，这可以提高应用程序的感知性能。

在所提供的例子中，RouterModule.forRoot()方法被调用，useHash设置为true，preloadingStrategy设置为PreloadAllModules，initialNavigation设置为'enable'。这意味着应用程序将使用基于哈希的路由，在后台预加载所有懒惰加载的模块，并在应用程序首次加载时立即启动初始导航。带有RouterModule的exports数组被用来使RouterModule可以在应用程序的其他部分使用。 */
