const loadPhone = async(search, dataLimit)=>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
    // console.log(data.data, dataLimit);
}

const displayPhone = (phones, dataLimit) =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML=``;
    // Show less
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
      phones = phones.slice(0, 10);
      showAll.classList.remove('d-none');
    }
    else{
      showAll.classList.add('d-none');
    }

    // No Phone Found
    const noPhoneFound = document.getElementById('no-phone-found');
    if(phones.length === 0){
      noPhoneFound.classList.remove('d-none');
    }
    else{
      noPhoneFound.classList.add('d-none');
    }

    phones.forEach(phone =>{
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML=`
        <div class="card rounded">
          <img src="${phone.image}" class="card-img-top" width="200" height="400" />
          <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">
              This is a longer card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <button onclick="loadDetail('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal"
            data-bs-target="#phoneDetailModal">See Details</button>
          
          </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });

    // stop toggleSpinner
    toggleSpinner(false);
}

const processData = (dataLimit) =>{
  toggleSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhone(searchText, dataLimit);
}

const searchPhone = () =>{
  processData(10);
}

document.getElementById('search-field').addEventListener('keypress',function(e){
  if(e.key == 'Enter'){
    processData(10);
  }
})

const toggleSpinner = isLoading =>{
  const spinner = document.getElementById('spinner');
  if(isLoading){
    spinner.classList.remove('d-none');
  }
  else{
    spinner.classList.add('d-none');
  }
}

document.getElementById('show-all').addEventListener('click', function(){
  processData();
})

// Load Phone Details
const loadDetail = async(id) =>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    showDetail(data.data);
    // console.log(data.data);
} 

// Display Phone Details 
const showDetail = phone =>{
  console.log(phone);
  const modalTitle = document.getElementById('phoneDetailModalLabel');
  modalTitle.innerText= phone.name;
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML=`
  <p><b>Chipset: </b> ${phone.mainFeatures.chipSet}</p>
  <p><b>Variant: </b>${phone.mainFeatures.storage}</p>
  <p><b>Display: </b>${phone.mainFeatures.displaySize}</p>
  <h5>${phone.releaseDate}</h5>
  `;
} 