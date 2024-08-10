import Swal from 'sweetalert2'

export const toastConfig = () => {
  return Swal.mixin({
    customClass: {
      container: 'sweet-toast',
    },
    toast: true,
    icon: 'success',
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    confirmButtonText: 'close',
    confirmButtonColor: 'white',
    timerProgressBar: true,
    showCloseButton: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  })
}

export const toastConfirm = (text, subText, html = '') => {
  return Swal.mixin({
    title: text ? text : 'Are you sure?',
    text: subText ? subText : 'You wanna proceed?',
    html: html,
    customClass: {
      container: 'sweet-toast',
    },
    showCancelButton: true,
    confirmButtonText: 'Yes',
    denyButtonText: 'No',
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  })
}

export const fireToast = (icon, title) => {
  toastConfig().fire({
    icon,
    title,
  })
}

export const fireSuccessToast = (title) => {
  fireToast('success', title)
}