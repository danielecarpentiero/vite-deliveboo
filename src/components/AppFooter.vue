<script>
export default {
  name: 'AppFooter',
  components: {},
};
</script>

<template>
  <footer class="text-white">
    <div class="p-5">
      <div class="row">
        <ul class="col col-md-3">
          <li class="list-group-item"><h4>Join us</h4></li>
          <li class="list-group-item">Restaurant</li>
          <li class="list-group-item">Careers</li>
          <li class="list-group-item">About</li>
        </ul>

        <ul class="col-12 col-md-3">
          <li class="list-group-item"><h4>Let us help you</h4></li>
          <li class="list-group-item">Help Center</li>
          <li class="list-group-item">Support</li>
          <li class="list-group-item">Contacts</li>
        </ul>

        <ul class="col-12 col-md-3">
          <li class="list-group-item"><h4>Follow us</h4></li>
          <li class="list-group-item">
            <font-awesome-icon icon="fa-brands fa-facebook-f" class="me-2" />
            Facebook
          </li>
          <li class="list-group-item">
            <font-awesome-icon icon="fa-brands fa-x-twitter" />
          </li>
          <li class="list-group-item">
            <font-awesome-icon
              icon="fa-brands fa-instagram"
              class="me-2"
            />Instagram
          </li>
        </ul>

        <div class="col-12 col-md-3">
          <h4>Download our App</h4>

          <div class="row gap-4 mt-3">
            <a
              href="#"
              class="store col d-flex align-items-center link-underline-0 gap-3 py-1 text-white link-offset-2 link-underline link-underline-opacity-0"
            >
              <font-awesome-icon icon="fa-brands fa-apple" class="icon col-2" />
              <div class="col">
                <p class="m-0 text-secondary">Download now</p>
                <h5>App Store</h5>
              </div>
            </a>
            <a
              href="#"
              class="store col d-flex align-items-center link-underline-0 gap-3 py-1 text-white link-offset-2 link-underline link-underline-opacity-0"
            >
              <font-awesome-icon
                icon="fa-brands fa-google-play"
                class="icon col-2"
              />
              <div class="col">
                <p class="m-0 text-secondary">Download now</p>
                <h5>Google Play</h5>
              </div>
            </a>
          </div>
        </div>
      </div>

      <hr class="border border-secondary border-2 opacity-50" />

      <div class="d-flex justify-content-between">
        <div>
          <p>Made by Boolean Team 4</p>
        </div>
        <ul class="d-flex gap-4">
          <li class="list-group-item">Privacy Policy</li>
          <li class="list-group-item">Terms & Conditions</li>
          <li class="list-group-item">Cookies Policy</li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
footer {
  background-color: #2b3445;

  .store {
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);

    .icon {
      font-size: 40px;
    }

    p {
      font-size: 13px;
    }
  }
}
</style>
