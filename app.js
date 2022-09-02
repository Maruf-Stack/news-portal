const loadData = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const data = await res.json();

    return data;
}
// display navbar 
const setNavbar = async () => {
    const data = await loadData();
    const catagories = data.data.news_category;
    const catagoryContainer = document.getElementById('catagory');

    catagories.forEach(catagory => {
        const nav = document.createElement('navbar');
        nav.innerHTML = `
        <ul class="navbar-nav">
        
        <li class="nav-item">
          <a class="nav-link fs-5 fw-semibold" href="#" onclick="loadCatagoriesData(${catagory.category_id})">${catagory.category_name}</a>
        </li> 
      </ul>
        `;
        catagoryContainer.appendChild(nav);
    })
}
// show news on click 
const loadCatagoriesData = (code) => {

    const url = `https://openapi.programming-hero.com/api/news/category/0${code}`;
    fetch(url)
        .then(res => res.json())
        .then(data => catagoriesDetails(data.data));

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
    <div class="col-md-4 col-sm-12 h-100">
    <img src="${category.image_url}" class="img-fluid w-100 rounded-start" alt="...">
    </div>
    <div class="col-md-8 col-sm-12 p-5">
        <h2>${category.title}</h2>
        <p class="mb-2">${category.details}</P>
        <div class="d-flex justify-content-between align-items-center">
        <div>
        <img src="${category.author.img}" class="img-fluid author rounded-circle">
        <span class="author-name">${category.author.name}</span></div>
        <span class="view ">${category.rating.total_view}</span>
        <button class="btn btn-primary px-3 py-2 fs-6 fw-semibold">Show details</button>
        </div>
    </div>
    `;
        catagoriesDetails.appendChild(div)
    })




}
setNavbar()
loadData()