<template>
  <div>
    <h2 class="bookingMsg">Great, You're Booked!</h2>
    <b-card tag="article" style="max-width: 32rem" class="mb-2" align="center">
      <b-row no-gutters>
        <b-col cols="5">
          <b-card-text>
            <p id="name">{{ clinic_name }}</p>
            <p id="address">{{ address }}</p>
          </b-card-text>
        </b-col>
        <b-col>
          <img id="line" src="../assets/line.png" alt="" />
        </b-col>
        <b-col cols="5">
          <b-card-text>
            <p id="day_name">{{ timeSlot.d_name }}</p>
            <p id="date">
              {{ timeSlot.date.d_number }}/{{ timeSlot.date.month }}
              {{ timeSlot.date.year }}
            </p>
            <p id="time">{{ timeSlot.time }}</p>
          </b-card-text>
        </b-col>
      </b-row>
      <b-button
        class="btn-primary"
        v-on:click="toHome"
        href="#"
        variant="primary"
      >
        Go Back To Home</b-button
      >
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeSlot: JSON.parse(this.$store.state.timeslot),
      clinic_name: JSON.parse(this.$store.state.clinic_name),
      address: JSON.parse(this.$store.state.address),
    };
  },
  methods: {
    toHome() {
      this.$router.push("/");
      location.reload();
    },
  },
};
</script>

<style scoped>
.mb-2 {
  margin: 30px auto;
  background-color: #e5f9e0 !important;
}

.bookingMsg {
  font-size-adjust: initial;
  font-size: 20pt;
  font-weight: 1000;
  text-align: center;
  color: #e5f9e0;
  margin-top: 4%;
  margin-bottom: 2%;
}

.btn-primary {
  color: rgba(255, 255, 255, 0.822);
  font-weight: 1000;
  background-color: #40c9a2 !important;
  border-color: #40c9a2;
  margin-top: 4%;
  margin-bottom: 3%;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.226), 0 3px 3px 0 rgba(0, 0, 0, 0.055);
}
.btn-primary:hover {
  border-color: transparent!important;
-webkit-box-shadow: 2px 5px 21px 5px rgba(0,0,0,0.28); 
box-shadow: 2px 5px 21px 5px rgba(0, 0, 0, 0.123);
}

#day_name {
  margin-top: 40%;
  font-size: 22pt;
  text-align: left;
  color: #664147;
  font-weight: 1000;
}

#line {
  margin-top: 100%;
}

#name {
  margin-top: 40%;
  font-size: 22pt;
  text-align: right;
  color: #664147;
  font-weight: 1000;
}
#date, #time {
  font-size: 13pt;
  text-align: left;
  color: #664147;
  font-weight: 1000;
}

#address {
  font-size: 13pt;
  text-align: right;
  color: #664147;
  font-weight: 1000;
}
</style>