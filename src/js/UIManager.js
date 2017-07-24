const $ = require("jquery");

export default class UIManager{
    constructor(selector){
        this.uiStateClasses = "empty loading error partial ideal"
        this.element = $(selector); //seleccionamos el elemento de jQuery en el constructor
    }

    setEmpty(){
        his.element.removeClass(this.uiStateClasses).addClass("emptly");
    }

    setLoading(){
        this.element.removeClass(this.uiStateClasses).addClass("loading");
    }

    setError(){
        this.element.removeClass(this.uiStateClasses).addClass("error");
    }

    setPartial(){
        this.element.removeClass(this.uiStateClasses).addClass("partial");
    }

    setIdeal(){
        this.element.removeClass(this.uiStateClasses).addClass("ideal");       
    }
}