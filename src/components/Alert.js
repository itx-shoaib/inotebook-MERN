import React from "react";

const Alert = () => {
    return (
        <div>
            <div class="alert alert-primary alert-dismissible fade show" role="alert">
                <strong>Hello Member!</strong> Welcome to iNotebook.
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                ></button>
            </div>
        </div>
    );
};

export default Alert;
