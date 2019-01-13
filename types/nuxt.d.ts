import Vue from 'vue';
import { MetaInfo } from 'vue-meta';
import { Route } from 'vue-router';
import { Store } from 'vuex';

type Redirect = (status: Number, path: string, query?: any) => void;
type RedirectWithStatus = (status: Number, path: string, query?: any) => void;

export interface Context {
  app: Vue;
  isClient: boolean;
  isServer: boolean;
  isStatic: boolean;
  isDev: Boolean;
  isHMR: Boolean;
  route: Route;
  store: Store<any>;
  env: object;
  params: Record<string, any>;
  query: Record<string, any>;
  req: any;
  res: any;
  redirect: Redirect | RedirectWithStatus;
  error: Function;
  nuxtState: any;
  beforeNuxtRender: Function;
  cookie?: {
    accessToken?: string;
  };
}

export interface Transition {
  name?: string;
  mode?: string;
  css?: boolean;
  duration?: number;
  type?: string;
  enterClass?: string;
  enterToClass?: string;
  enterActiveClass?: string;
  leaveClass?: string;
  leaveToClass?: string;
  leaveActiveClass?: string;
  beforeEnter?(el: HTMLElement): void;
  enter?(el: HTMLElement, done: Function): void;
  afterEnter?(el: HTMLElement): void;
  enterCancelled?(el: HTMLElement): void;
  beforeLeave?(el: HTMLElement): void;
  leave?(el: HTMLElement, done: Function): void;
  afterLeave?(el: HTMLElement): void;
  leaveCancelled?(el: HTMLElement): void;
}

export type Middleware = string | ((ctx: Context, cb: Function) => Promise<void> | void);

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    asyncData?(ctx: Context): object | undefined;
    fetch?(ctx: Context): Promise<void> | void;
    head?: MetaInfo | (() => MetaInfo);
    key?: string | ((to: Route) => string);
    layout?: string | ((ctx: Context) => string);
    middleware?: Middleware | Middleware[];
    scrollToTop?: boolean;
    transition?: string | Transition | ((to: Route, from: Route) => string);
    validate?(ctx: Context): Promise<boolean> | boolean;
    watchQuery?: boolean | string[];
  }
}
