export default class ViewMoreBtnService {
  constructor(selector, isHiiden = true) {
    this.selector = selector;

    isHiiden && this.hide()
  }

  getRef(){
    const viewMoreBtn = document.querySelector(`${this.selector}`);
    const spinner = viewMoreBtn.querySelector('.spinner-border');
    const text = viewMoreBtn.querySelector('.btn-primary__text');

    return {viewMoreBtn, spinner, text}
  }

  disabled(){
    const viewMoreBtn = this.getRef().viewMoreBtn;
    const text = this.getRef().text;
    const spinner = this.getRef().spinner

    viewMoreBtn.classList.remove('is-hidden');
    text.innerHTML = 'Loading'
    viewMoreBtn.disabled = true;
    spinner.classList.remove('is-hidden');
  }

  enabled(){
    const viewMoreBtn = this.getRef().viewMoreBtn;
    const text = this.getRef().text;
    const spinner = this.getRef().spinner;

    viewMoreBtn.disabled = false;
    text.innerHTML = 'View More';
    spinner.classList.add('is-hidden');
  }

  hide(){
    this.getRef().viewMoreBtn.classList.add('is-hidden')
  }
}