let pageCount;
var input = document.getElementById("input_query");
input.addEventListener("keyup", handleclick);
function handleclick(e) {
  if (e.keyCode === 13) {
     imageElements = "";
    pageCount = 1;
    document.getElementById("search_button").click();
  }
}

let imageElements = '';
const generateImages = () => {
  let query = input.value;
  if (query !== '') {
    fetchGetReq(query);
  }
}
const fetchGetReq = (query) => {
  console.log(pageCount)
  let url = `https://api.unsplash.com/search/photos?page=${pageCount}&query=${query}&client_id=OsRP6Z7UVgxNrf13I-9rP7AsYLupKuHmWrLXzK1OQZ0`;
  fetch(url)
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
      let result = resp.results;
      for (let i = 0; i < 10; i++) {
        imageElements += `<img src="${result[i].urls.small}" class="img-fluid" alt="${result[i].alt_description}">`;
      }
      document.getElementById("image_area").innerHTML = imageElements;
    })
    .catch(error => {
      alert("Please Enter Valid Qyery", error);
    })
}
const loadMorePage = () => {
  setTimeout(() => {
    pageCount++;
    generateImages();
  }, 300)
}
window.addEventListener("scroll", () => {
  console.log("im at scrolling");
  const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
  if (clientHeight + scrollTop+1 >= scrollHeight) {
    console.log("im at bottom");
    loadMorePage();
  }
})