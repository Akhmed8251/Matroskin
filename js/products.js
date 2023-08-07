document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.querySelector(".menu__icon")
    const menu = document.querySelector(".menu")
    menuIcon.addEventListener("click", () => {
        document.body.classList.toggle("no-scroll")
        menu.classList.toggle("active")
    })

    const menuItemsWithSubmenu = document.querySelectorAll(".has-submenu")
    menuItemsWithSubmenu.forEach(menuItem => {
        menuItem.addEventListener("click", () => {
            menuItem.classList.toggle("open")

            let submenu = menuItem.querySelector(".submenu") 
            if (menuItem.classList.contains("open")) {
                submenu.style.maxHeight = submenu.scrollHeight + 'px';
            } else {
                submenu.style.maxHeight = null;
            }
        })
    })    

    const favoriteBtns = document.querySelectorAll(".goods-slide__favorite")
    favoriteBtns.forEach(favBtn => {
        favBtn.addEventListener("click", () => {
            favBtn.classList.toggle("active")
        })
    })

    const filterItemsTitle = document.querySelectorAll(".filter-item__title")
    filterItemsTitle.forEach(filterItemTitle => {
        filterItemTitle.addEventListener("click", () => {     
            const filterItem = filterItemTitle.closest(".filter-item")
            const filterItemContent = filterItem.querySelector(".filter-item__content")           

            filterItem.classList.toggle("open")
            
            if (filterItem.classList.contains("open")) {
                filterItemContent.style.maxHeight = filterItemContent.scrollHeight + 'px';
            } else {
                filterItemContent.style.maxHeight = null;
            } 
        })
    })

    const rangeSlider = document.getElementById('range-slider');

    noUiSlider.create(rangeSlider, {
        start: [100, 500],
        range: {
            'min': [0],
            'max': [1000]
        }
    });

    const input0 = document.getElementById('input-0');
	const input1 = document.getElementById('input-1');
	const inputs = [input0, input1];

	rangeSlider.noUiSlider.on('update', function(values, handle){
		inputs[handle].value = Math.round(values[handle]);
	});

    const select = document.querySelectorAll('.select');
    select.forEach(selectItem => {
       selectItem.querySelector('.select__btn').addEventListener('click', function() {
           selectItem.classList.toggle('active');
       })
       let options = selectItem.querySelectorAll('.select__option');
       options.forEach(option => {
           option.addEventListener('click', function() {
               let selectedOption = this.querySelector('.select__option-text');
               let selectedOptionText = selectedOption.innerText;
               selectItem.querySelector('.select__text').innerText = selectedOptionText;
               
               let selectActive = selectItem.querySelector(".select__option.selected")
               if (selectActive) {
                  selectActive.classList.remove("selected")  
               }
               option.classList.add("selected")

               selectItem.classList.remove('active');
           })
       }) 
    })

    const productsViews = document.querySelectorAll(".view__item")
    productsViews.forEach(view => {
        view.addEventListener("click", () => {
            const productsCatalogList = document.querySelector(".products__catalog-list")         
            const viewName = view.dataset.view

            const viewActive = document.querySelector(".view__item.active")
            if (viewActive) {
                productsCatalogList.className = "products__catalog-list"
                viewActive.classList.remove("active")
            }

            view.classList.add("active")
            productsCatalogList.classList.add(viewName)
        })
    })

    const productsFilter = document.querySelector(".products__filter")
    const filterMobileBtn = document.querySelector(".products__filter-mobile-btn")
    filterMobileBtn.addEventListener("click", () => {
        document.body.classList.add("no-scroll")
        productsFilter.classList.add("active")
    })

    // const rangeValues = document.querySelector(".range-slider__values")
    // rangeSlider.noUiSlider.on('update', function (values, handle) {
    //     rangeValues.innerHTML = values[handle];
    // });
})