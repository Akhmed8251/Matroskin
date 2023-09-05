document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector(".menu__icon");
  const menu = document.querySelector(".menu");
  menuIcon.addEventListener("click", () => {
    document.body.classList.toggle("no-scroll");
    menu.classList.toggle("active");
  });

  const menuItemsWithSubmenu = document.querySelectorAll(".has-submenu button");
  menuItemsWithSubmenu.forEach((menuItem) => {
    menuItem.addEventListener("click", () => {
      let hasSubmenuBlock = menuItem.closest(".has-submenu")
     hasSubmenuBlock.classList.toggle("open");

      let submenu = menuItem.nextElementSibling;
      if (hasSubmenuBlock.classList.contains("open")) {
        submenu.style.maxHeight = submenu.scrollHeight + "px";
      } else {
        submenu.style.maxHeight = null;
      }
    });
  });

  const favoriteBtns = document.querySelectorAll(".goods-slide__favorite");
  favoriteBtns.forEach((favBtn) => {
    favBtn.addEventListener("click", () => {
      favBtn.classList.toggle("active");
    });
  });

  const filterItemsTitle = document.querySelectorAll(".filter-item__title");
  filterItemsTitle.forEach((filterItemTitle) => {
    filterItemTitle.addEventListener("click", () => {
      const filterItem = filterItemTitle.closest(".filter-item");
      const filterItemContent = filterItem.querySelector(
        ".filter-item__content"
      );

      filterItem.classList.toggle("open");

      if (filterItem.classList.contains("open")) {
        filterItemContent.style.maxHeight =
          filterItemContent.scrollHeight + "px";
      } else {
        filterItemContent.style.maxHeight = null;
      }
    });
  });

  const rangeSlider = document.getElementById("range-slider");

  noUiSlider.create(rangeSlider, {
    start: [100, 500],
    connect: true,
    range: {
      min: [0],
      max: [1000],
    },
  });

  const input0 = document.getElementById("input-0");
  const input1 = document.getElementById("input-1");
  const inputs = [input0, input1];

  rangeSlider.noUiSlider.on("update", function (values, handle) {
    inputs[handle].value = Math.round(values[handle]);
  });

  const setRangeSlider = (i, value) => {
    let arr = [null, null]
    arr[i] = value

    rangeSlider.noUiSlider.set(arr)
  }

  inputs.forEach((el, index) => {
    el.addEventListener("input", (e) => {
      setRangeSlider(index, e.target.value)
    })
  })

  const select = document.querySelectorAll(".select");
  select.forEach((selectItem) => {
    selectItem
      .querySelector(".select__btn")
      .addEventListener("click", function () {
        selectItem.classList.toggle("active");
      });
    let options = selectItem.querySelectorAll(".select__option");
    options.forEach((option) => {
      option.addEventListener("click", function () {
        let selectedOption = this.querySelector(".select__option-text");
        let selectedOptionText = selectedOption.innerText;
        selectItem.querySelector(".select__text").innerText =
          selectedOptionText;

        let selectActive = selectItem.querySelector(".select__option.selected");
        if (selectActive) {
          selectActive.classList.remove("selected");
        }
        option.classList.add("selected");

        selectItem.classList.remove("active");
      });
    });
  });

  const productsCatalogList = document.querySelector(".products__catalog-list");

  // const changeProductsViewWithResize = () => {
  //     const breakpoint = window.matchMedia("(max-width: 575px)")
  //     if (breakpoint.matches) {
  //         productsCatalogList.className = "products__catalog-list"
  //         productsCatalogList.classList.add("two-columns")
  //     } else {
  //         productsCatalogList.className = "products__catalog-list"
  //         productsCatalogList.classList.add("three-columns")
  //     }
  // }

  // window.addEventListener("resize", changeProductsViewWithResize)

  const productsShowCountItems = document.querySelectorAll(".show-count__item");
  productsShowCountItems.forEach((showCountItem) => {
    showCountItem.addEventListener("click", () => {
      // productsShowCountItems.forEach((scItem) => {
      //   scItem.classList.remove("active");
      // });
      const scActive = document.querySelector(".show-count__item.active");
      scActive.classList.remove("active")
      showCountItem.classList.add("active");
      productsCatalogList.innerHTML = ""
      getProducts(showCountItem.textContent)
    });
  });

  const productsViews = document.querySelectorAll(".view__item");
  productsViews.forEach((view) => {
    view.addEventListener("click", () => {
      const viewName = view.dataset.view;

      for (let viewItem of productsViews) {
        if (viewItem.classList.contains("active")) {
          viewItem.classList.remove("active");
          productsCatalogList.className = "products__catalog-list";
        }
      }

      view.classList.add("active");
      productsCatalogList.classList.add(viewName);
    });
  });

  const productsFilter = document.querySelector(".products__filter");
  const filterMobileBtn = document.querySelector(
    ".products__filter-mobile-btn"
  );
  filterMobileBtn.addEventListener("click", () => {
    document.body.classList.add("no-scroll");
    productsFilter.classList.add("active");
  });

  const productsFilterArea = document.querySelector(".products__filter-area");
  productsFilterArea.addEventListener("click", () => {
    productsFilter.classList.remove("active");
    document.body.classList.remove("no-scroll");
  });

  // const rangeValues = document.querySelector(".range-slider__values")
  // rangeSlider.noUiSlider.on('update', function (values, handle) {
  //     rangeValues.innerHTML = values[handle];
  // });

  const productsCatalogInner = document.querySelector(
    ".products__catalog-inner"
  );

  const getProducts = async (countProducts, skip = 0) => {
    const jsonFilePath = "json/products.json";
    let response = await fetch(jsonFilePath);

    if (response.ok) {
      let data = await response.json();
      let productsData = data.products.splice(skip, countProducts);
      let isShowMoreBtn = countProducts == productsData.length;
      loadProducts(productsData, isShowMoreBtn);
    } else {
      alert("Ошибка загрузки товаров");
    }
  };

  const loadProducts = (products, isShowMoreBtn = true) => {
    if (products.length > 0) {
      let res = "";
      let countWeight =
        parseInt(
          document
            .querySelector(".good:last-of-type .radio__item:last-child label")
            ?.getAttribute("for")
            .replace("radio", "")
        ) + 1 || 1;
      let countProducts = document.querySelectorAll(".good").length + 1 || 1;

      for (let i = 0; i < products.length; i++) {
        let product = `<li class="products__catalog-item good" data-pid="${products[i].id}">`;
        let productHeader = `
        <div class="good__header">
      `;

        let productsLabels = "";
        if (products[i].labels.length > 0) {
          productsLabels = `<div class="good__labels">`;
          products[i].labels.forEach((label) => {
            productsLabels += `
                <span class="good__label good__label--${label.type}">${label.value}</span>
            `;
          });
          productsLabels += "</div>";
        }
        productHeader += productsLabels;

        let productImage = `
        <div class="good__img">
            <img src="img/${products[i].image_url}" alt="">
        </div>
      `;
        productHeader += productImage;

        let productFavorite = `
        <button class="good__favorite">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M20.8401 4.60987C20.3294 4.09888 19.7229 3.69352 19.0555 3.41696C18.388 3.14039 17.6726 2.99805 16.9501 2.99805C16.2276 2.99805 15.5122 3.14039 14.8448 3.41696C14.1773 3.69352 13.5709 4.09888 13.0601 4.60987L12.0001 5.66987L10.9401 4.60987C9.90843 3.57818 8.50915 2.99858 7.05012 2.99858C5.59109 2.99858 4.19181 3.57818 3.16012 4.60987C2.12843 5.64156 1.54883 7.04084 1.54883 8.49987C1.54883 9.95891 2.12843 11.3582 3.16012 12.3899L4.22012 13.4499L12.0001 21.2299L19.7801 13.4499L20.8401 12.3899C21.3511 11.8791 21.7565 11.2727 22.033 10.6052C22.3096 9.93777 22.4519 9.22236 22.4519 8.49987C22.4519 7.77738 22.3096 7.06198 22.033 6.39452C21.7565 5.72706 21.3511 5.12063 20.8401 4.60987V4.60987Z"
                    stroke="#292929" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </button>
      `;
        productHeader += productFavorite;
        productHeader += "</div>";

        let productBody = `
        <div class="good__body">
      `;
        let productPrices = `
        <div class="good__prices">   
      `;
        if (products[i].price) {
          productPrices += `
            <span class="good__price">${products[i].price}</span>     
        `;
        }
        if (products[i].priceOld) {
          productPrices += `
            <span class="good__price good__price--old">
                <s>${products[i].priceOld}</s>
            </span>
        `;
        }
        productPrices += "</div>";
        productBody += productPrices;

        let productTitle = `
        <h3 class="good__title">${products[i].title}</h3>               
      `;
        productBody += productTitle;

        let productDesc = `
        <p class="good__desc">
            ${products[i].text}
        </p>
      `;
        productBody += productDesc;

        let productWeight = `
        <div class="good__weights radio">
            <ul class="radio__list">
      `;

        for (let weight of products[i].weights) {
          productWeight += `
            <li class="radio__item">
                <input type="radio" name="radio${countProducts}" id="radio${countWeight}" checked>
                <label for="radio${countWeight}">
                    ${weight}г
                </label>
            </li>
        `;
          countWeight++;
        }
        productWeight += "</ul></div>";
        productBody += productWeight;

        let productBottom = `
        <div class="good__bottom">
            <div class="good__counter counter">
                <button class="counter__substract">
                    <svg width="10" height="2" viewBox="0 0 10 2" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 0.999878H9" stroke="#B3B6C9" stroke-width="1.2"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <div class="counter__count">1</div>
                <button class="counter__add">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 0.999878V8.99988" stroke="#B3B6C9"
                            stroke-width="1.2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M1 4.99988H9" stroke="#B3B6C9" stroke-width="1.2"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
            <button class="good__btn">
                В корзину
            </button>
        </div>
      `;
        productBody += productBottom;

        product += productHeader;
        product += productBody;
        product += "</li>";
        res += product;
        countProducts++;
      }
      productsCatalogList.insertAdjacentHTML("beforeend", res);
    }

    if (isShowMoreBtn) {
      productsMore.closest("div").classList.remove("visually-hidden");
    } else {
      productsMore.closest("div").classList.add("visually-hidden");
    }
  };

  const productsMore = document.querySelector(".products__more button");
  productsMore.addEventListener("click", () => {
    const scActive = document.querySelector(".show-count__item.active");
    const showViewCount = parseInt(scActive.textContent.trim());

    const skip = document.querySelectorAll(".good").length;

    if (skip == 0) {
      productsCatalogInner.append(`
        <div class="loader">
            <img src="img/loader.svg" alt="">
        </div>
      `);
    }
    productsMore.classList.add("hold");
    getProducts(showViewCount, skip);
    productsMore.classList.remove("hold");
  });

  const PRODUCT_SHOW_COUNT = document.querySelector(".show-count__item.active").textContent;
  getProducts(PRODUCT_SHOW_COUNT);
});
