import { ProductApiProxy } from 'src/app/api/services/product.service';
import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { OverlayPanel } from 'primeng/overlaypanel';
import { AuthApiProxy } from 'src/app/api/services/auth.service';
import { CategoryApiProxy } from 'src/app/api/services/category.service';
import { BaseComponent } from 'src/app/base/common/base.component';
import { RouteConstant } from 'src/app/base/constants';
import { AuthResolverService } from 'src/app/base/services/auth-resolver.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent extends BaseComponent implements OnInit {
  @ViewChild(Menubar) menubar?: Menubar;
  @ViewChild(OverlayPanel) overlay?: OverlayPanel;

  overlayContent = '';
  nav: MenuItem[] = [];
  categoryMenuItem: MenuItem[] = [];

  controls = {
    search: new FormControl(''),
  };

  form = new FormGroup(this.controls);

  constructor(
    public authenResolver: AuthResolverService,
    private cdr: ChangeDetectorRef,
    private categoryService: CategoryApiProxy,
    private authService: AuthApiProxy,
    private router: Router,
    private productService: ProductApiProxy
  ) {
    super();
    this.nav = this.getMenuItem();
  }

  ngOnInit(): void {
    if (!this.authenResolver.isLogin$.value && this.authenResolver.authToken) {
      this.authService
        .reLogin()
        .subscribe((auth) => this.authenResolver.setAuthData(auth));
    }
  }

  *onSubscribe() {
    yield this.authenResolver.isLogin$.subscribe((x) => {
      this.nav = this.getMenuItem();
      this.cdr.detectChanges();
    });
    yield this.categoryService.getAllCategory().subscribe((value) => {
      this.categoryMenuItem = value.map((x) => {
        return {
          label: x.name,
          routerLink: [RouteConstant.CATEGORY, x.id],
          visible: true,
        };
      });
      this.nav = this.getMenuItem();
      this.cdr.detectChanges();
    });
  }

  private getMenuItem(): MenuItem[] {
    const result: MenuItem[] = [];
    Object.keys(this.defaultMenu).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(this.defaultMenu, key)) {
        result.push(...this.defaultMenu[key].filter((x) => x.visible));
      }
      if (this.defaultMenu[key].some((x) => x.visible)) {
        result.push({ separator: true, visible: true });
      }
    });

    if (this.authenResolver.isLogin$.value) {
      Object.keys(this.accountMenuAfterLogin).forEach((key) => {
        if (
          Object.prototype.hasOwnProperty.call(this.accountMenuAfterLogin, key)
        ) {
          result.push(
            ...this.accountMenuAfterLogin[key].filter((x) => x.visible)
          );
        }
        if (this.accountMenuAfterLogin[key].some((x) => x.visible)) {
          result.push({ separator: true, visible: true });
        }
      });
    } else {
      Object.keys(this.accountMenuIsNotLogin).forEach((key) => {
        if (
          Object.prototype.hasOwnProperty.call(this.accountMenuIsNotLogin, key)
        ) {
          result.push(
            ...this.accountMenuIsNotLogin[key].filter((x) => x.visible)
          );
        }
        if (this.accountMenuIsNotLogin[key].some((x) => x.visible)) {
          result.push({ separator: true, visible: true });
        }
      });
    }

    result.pop();
    return result;
  }

  private get defaultMenu(): { [key: string]: MenuItem[] } {
    return {
      Home: [
        {
          label: 'Trang chủ',
          routerLink: [RouteConstant.HOME],
          visible: true,
        },
      ],
      Product: [
        {
          label: 'Sản phẩm',
          visible: true,
          items: this.categoryMenuItem,
        },
      ],
      Order: [
        {
          label: 'Đơn hàng',
          routerLink: [RouteConstant.ORDER],
          visible: this.authenResolver.isLogin$.value,
        },
      ],
      User: [
        {
          label: 'Người dùng',
          routerLink: [RouteConstant.USER],
          visible: this.authenResolver.isAdmin,
        }
      ]
    };
  }

  private get accountMenuIsNotLogin(): { [key: string]: MenuItem[] } {
    return {
      Account: [
        {
          label: 'Tài khoản',
          visible: true,
          items: [
            {
              label: 'Đăng nhập',
              routerLink: [RouteConstant.SIGN_IN],
              visible: !this.authenResolver.isLogin$.value,
            },
            {
              label: 'Đăng ký',
              routerLink: [RouteConstant.SIGN_UP],
              visible: !this.authenResolver.isLogin$.value,
            },
          ],
        },
      ],
    };
  }

  private get accountMenuAfterLogin(): { [key: string]: MenuItem[] } {
    return {
      Account: [
        {
          label: `${this.authenResolver.currentUser?.email}`,
          visible: true,
          items: [
            {
              label: 'Tài khoản',
              routerLink: [RouteConstant.ACCOUNT],
              visible: this.authenResolver.isLogin$.value,
            },
            {
              label: 'Thêm sản phẩm',
              routerLink: [
                RouteConstant.PRODUCT + '/' + RouteConstant.ADD_PRODUCT,
              ],
              visible: this.authenResolver.isAdmin,
            },
            {
              label: 'Sản phẩm yêu thích',
              routerLink: [
                RouteConstant.PRODUCT + '/' + RouteConstant.WISH_LIST,
              ],
              visible: this.authenResolver.isLogin$.value,
            },
            {
              label: 'Đăng xuất',
              routerLink: [RouteConstant.SIGN_OUT],
              visible: this.authenResolver.isLogin$.value,
            },
          ],
        },
      ],
    };
  }

  goToCart() {
    this.router.navigate([RouteConstant.CART]);
  }

  search() {
    const search = this.controls.search.value;
    if (search) {
      this.router.navigate([
        RouteConstant.PRODUCT + '/' + RouteConstant.SEARCH,
        search,
      ]);
    }
  }
}
