const loadData = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/news/categories");
    try {
        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error)
    }
}
// display navbar 
const setNavbar = async () => {
    const data = await loadData();
    const catagories = data.data.news_category;
    const catagoryContainer = document.getElementById('catagory');
    const p = document.createElement('p');
    p.classList.add("nav-item");
    p.innerHTML = `
    <a class="nav-link fs-5 fw-semibold catagory" href="#">Home</a>
    `;
    catagoryContainer.appendChild(p)
    catagories.forEach(catagory => {
        const ul = document.createElement('ul');
        ul.innerHTML = `
                <li class="nav-item">

                    <a class="nav-link fs-5 fw-semibold catagory" href="#"
                        onclick="loadCatagoriesData(${catagory.category_id})">${catagory.category_name}</a>
                </li>
        `;
        catagoryContainer.appendChild(ul);
    })
}
// show news on click 
const loadCatagoriesData = (code) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${code}`;
    fetch(url)
        .then(res => res.json())
        .then(data => catagoriesDetails(data.data))
        .catch(error => console.log(error));


}
const catagoriesDetails = categorys => {
    const catagoriesDetails = document.getElementById('catagories-details');
    catagoriesDetails.textContent = '';
    categorys.forEach(category => {
        const div = document.createElement('div');
        div.classList.add("row");
        div.classList.add("mb-5");
        div.classList.add("shadow");
        div.classList.add("d-flex");
        div.classList.add("align-items-center");
        div.classList.add("justify-content-center");
        div.innerHTML = `
    <div class="col-md-4 col-12 h-100">
    <img src="${category.image_url}" class="img-fluid  rounded-start main-image" alt="...">
    </div>
    <div class="col-md-8 col-12 p-5">
        <h2 class="text-dark fw-semibold">${category.title}</h2>
        <p class="mb-2">${category.details.length > 200 ? category.details.slice(0, 200) + ('...') : category.details}</P>
        <div class="d-flex justify-content-between align-items-center">
        <div class="info">
        <img src="${category.author.img}" class="img-fluid author rounded-circle">
        <span class="author-name">${category.author.name}</span></div>
        <span class="view fs-5"><i class="fa-regular fa-eye fs-6 fw-semibold me-2"></i> ${category.total_view}</span>
        <button type="button" id="modal-button" class="btn btn-primary px-4 py-2 border-0"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="modalData('${category._id}')">
        Show details
    </button>
        </div>
    </div>
    `;
        catagoriesDetails.appendChild(div);

    })
    loadSpinner(false);

}
// modal 
const modalData = modalId => {
    const url = `https://openapi.programming-hero.com/api/news/${modalId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => modalShow(data.data))
        .catch(error => console.log(error));
}

const modalShow = modals => {
    const modalConainer = document.getElementById('modal');
    modalConainer.textContent = '';
    modals.forEach(modal => {
        const div = document.createElement('div');

        div.classList.add('modal-content');
        div.innerHTML = `
        <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <img src="${modal.image_url}">
    <div class="modal-body">
        <h4 class="mb-5"> ${modal.title}</h4>
        <div class="mb-4">
        <h5 class="fs-5 fw-bold">Author :</h5>
        <img src="${modal.author.img === null ? 'author photo not found' : modal.author.img}" class="modal-author rounded-circle mt-1">
        <span class="fw-bold fs-5 text-dark" id="author">${modal.author.name === null ? 'author name not found' : modal.author.name}</span>
        
        </div>
        <span class="view fw-semibold fs-5"><i class="fa-regular fa-eye fs-6 fw-bold"></i> ${modal.total_view === null ? 'no view yet' : modal.total_view}</span>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
    `;

        modalConainer.appendChild(div);


    })

}
// load spinner 
document.getElementById('catagory').addEventListener('click', function () {
    loadSpinner(true);
})

const loadSpinner = loading => {
    const loadingspinner = document.getElementById('spinner');
    if (loading) {
        loadingspinner.classList.remove('d-none');
    } else {
        loadingspinner.classList.add('d-none')
    }
}
// found 

// const foundCategory = found => {
//     const foundNum = document.getElementById('found');
//     const foundNumString = foundNum.innerText;
//     const num = parseInt(foundNumString);

// }
// foundCategory()
setNavbar();
loadData();
