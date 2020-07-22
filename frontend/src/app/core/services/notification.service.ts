import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificationService {
    toastrConfig = {
        timeOut: 10000,
        progressBar: true
    }
    constructor(public toastr: ToastrService) { }

    success(message, title = 'Success') {
        this.toastr.success(
            message,
            title,
            this.toastrConfig
        );
    }

    error(message = 'Sorry, something went wrong. Please try again.', title = 'Error') {
        this.toastr.error(
            message,
            title,
            this.toastrConfig
        );
    }

    info(message, title = 'Information') {
        this.toastr.info(
            message,
            title,
            this.toastrConfig
        );
    }

    warn(message, title = 'Warning') {
        this.toastr.warning(
            message,
            title,
            this.toastrConfig
        );
    }
}
