import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../features/auth/services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
    const authSvc = inject(AuthService);
    const router = inject(Router);

    if(authSvc.isLoggedIn()){
        return true;
    } else {
        router.navigate(['/auth/login']);
        return false;
    }
}