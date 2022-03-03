<script setup>
import { computed, ref } from "vue";
import { APISettings } from "./api/config.js";

const images = ref([]);

const img = ref("");

const uploadedFile = ref()

function clickedImage(image) {
  img.value = APISettings.getImageURL(image);
}

function fetchImages() {
  getImages().then(function (result) {
    images.value = result;
  });
}

async function getImages() {
  return fetch(APISettings.baseURL, {
    method: "GET",
    headers: APISettings.headers,
  }).then(function (response) {
    if (response.status != 200) {
      throw response.status;
    } else {
      return response.json();
    }
  });
}

async function postImage() {
  
  if (uploadedFile.value == undefined) {
    return
  }
  let formData = new FormData()
  formData.append(uploadedFile.value.name, uploadedFile.value)

   fetch(APISettings.baseURL, {
    method: "POST",
    body: formData,
  }).then(function (response) {
    if (response.status != 200) {
      throw response.status;
    } else {
      fetchImages()
    }
  })
}

const imageThere = computed(() => {
  return img.value.length > 0;
});

function clearImage() {
  img.value = "";
}

function previewFiles(event) {
  console.log(event.target.files)
  uploadedFile.value = event.target.files[0]
}

</script>

<template>
  <ul>
    <li v-for="image in images" :key="image">
      <div @click="clickedImage(image)">{{ image }}</div>
    </li>
  </ul>
  <button @click="fetchImages">Fetch images</button>
  <form @submit.prevent="postImage">
    <input type="file" accept="application/image" @change="previewFiles" />
    <button type="submit"> submit </button>
  </form>

  <div v-if="imageThere">
    <img @click="clearImage" :src="img" width="500" height="500" />
  </div>
</template>

<style>
.done {
  text-decoration: line-through;
}
</style>
