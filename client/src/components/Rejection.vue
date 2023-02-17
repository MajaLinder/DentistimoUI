<template>
  <div>
    <h2 id="title">Sorry, This Request Has Been Rejected!</h2>
    <b-card tag="article" style="max-width: 40rem" class="mb-2" align="center">
      <b-card-text class="card">
        Your requested appointment at {{ clinic_name }} has already been booked
        by another user. <br /><br />
        <p>
          Time: {{ timeSlot.time }}<br />
          Date: {{ timeSlot.d_name }} {{ timeSlot.date.d_number }}/{{
            timeSlot.date.month
          }}
          {{ timeSlot.date.year }}
        </p>
        Please book another appointment.
      </b-card-text>
      <div class="text-xs-center">
        <b-button
          v-on:click="toHome"
          href="#"
          class="btn-home"
          variant="primary"
          >Go Back Home</b-button
        >
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeSlot: JSON.parse(this.$store.state.timeslot),
      clinic_name: JSON.parse(this.$store.state.clinic_name),
    };
  },
  methods: {
    toHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.mb-2 {
  margin: 30px auto;
}

h2 {
  color: #e5f9e0!important;
  font-weight: 1000;  
  font-size: 30pt!important;

}

.card {
  font-size-adjust: initial;
  font-size: 20pt;
  font-weight: 1000;
  text-align: center;
  color: #664147;
  margin-top: 4%;
  margin-bottom: 2%;
  background-color: #e5f9e0;
  border: transparent !important;
  width: 100%;
}

#title {
  font-size-adjust: initial;
  font-size: 20pt;
  text-align: center;
  color: #050505;
  margin-top: 4%;
  margin-bottom: 2%;
}

.btn-home {
  color: rgba(255, 255, 255, 0.822);
  font-weight: 1000;
  background-color: #40c9a2 !important;
  border-color: #40c9a2;
  margin-top: 4%;
  margin-bottom: 3%;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.226), 0 3px 3px 0 rgba(0, 0, 0, 0.055);
}
.btn-home:hover {
  border-color: transparent !important;
  -webkit-box-shadow: 2px 5px 21px 5px rgba(0, 0, 0, 0.28);
  box-shadow: 2px 5px 21px 5px rgba(0, 0, 0, 0.123);
}
</style>
