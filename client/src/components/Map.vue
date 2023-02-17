<template>

  <MglMap
    :accessToken="accessToken"
    :mapStyle="mapStyle"
    :center="center"
    :zoom="zoom"
    class="map"
    style="min-height: 800px"
  >
    <MglMarker
      v-for="(clinic, key) in clinics"
      :key="key"
      :coordinates="[clinic.coordinate.longitude, clinic.coordinate.latitude]"
      :color="color"
      anchor="top"
    >
      <MglPopup>
        <VCard>
          <h2>{{ clinic.name }}</h2>
          <p>Address: {{ clinic.address }}</p>
          <ul>Opening Hours:
          <li>Mon: {{ clinic.openinghours.monday }}</li>
          <li>Tue: {{ clinic.openinghours.tuesday }}</li>
          <li>Wed: {{ clinic.openinghours.wednesday }}</li>
          <li>Thu: {{ clinic.openinghours.thursday }}</li>
          <li>Fri: {{ clinic.openinghours.friday }}</li>
          </ul>
          <b-button id="btn" v-on:click="setChosenClinic(clinic)"
            >See Availability</b-button
          >
        </VCard>
      </MglPopup>
    </MglMarker>
  </MglMap>
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglPopup, MglMarker } from "vue-mapbox";
import { client } from "../../mqttClient/mqtt";
import Publisher from "../../mqttClient/pub";

export default {
  components: {
    MglMap,
    MglPopup,
    MglMarker,
  },
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoiZGVudGlzbW8iLCJhIjoiY2t3a25qaWx3MXU0NTJwcG1iaXA1NGlsMiJ9.m8bS5KOafpJA5ZC77Q6DQA",
      mapStyle: "mapbox://styles/mapbox/streets-v11",
      clinics: undefined,
      center: [11.955971491765583, 57.69678241834232],
      zoom: 12,
      color: "teal",
      topic: "/requestList",
      publisher: new Publisher(),
      qos: 1,
      payload: "",
      chosenClinic: null,
    };
  },
  mounted() {
    this.created();
  },
  methods: {
    created() {
      // We need to set mapbox-gl library here in order to use it in template
      this.mapbox = Mapbox;
      this.requestData();
      this.getData();
    },
    getData() {
      console.log("Before Json data is = ")
      client.on("message", (topic, message) => {
        console.log(topic)
        if (topic === "/jsonData") {
          const jsonData = JSON.parse(message);
          this.clinics = jsonData.dentists;
        }
      });
    },
    requestData() {
      this.publisher.pubToTopic(this.topic, this.payload, this.qos);
    },
    setChosenClinic(clinic) {
      this.coordinates = [clinic.coordinate.longitude, clinic.coordinate.latitude];
      this.$emit("update-chosenClinic", clinic);
    },
  },
};
</script>
<style scoped>
Vcard {
  color: #664147;
  background-color: #fdfcdc;
  font-family: 'Nunito', sans-serif;
  font-weight: 1000;

}
button {
  color: #ffff;
  background-color: #664147;
  border-block-end-color: transparent;
}

button:hover {
  background-color: #664147;
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
.mapSize{
  max-width: 100%;
}


</style>