<template>
  <div>
    <div id="spree-header">
      <header id="header" data-hook>
        <div class="container">
          <nav class="navbar navbar-light justify-content-between" id="top-nav-bar">
            <a class="navbar-brand" href="/">
              <img src="~/assets/spree_50.png" height="50" class="d-inline-block align-top"/>
            </a>
            <form class="form-inline my-2 my-lg-0" action="/products" accept-charset="UTF-8" method="get">
              <input name="utf8" type="hidden" value="✓">
              <div class="form-group">
                <select name="taxon" id="taxon" aria-label="Taxon" class="form-control">
                  <option value="">All departments</option>
                  <option value="1">Categories</option>
                  <option value="2">Brands</option>
                </select>
              </div>
              <div class="form-group">
                <input type="search" name="keywords" id="keywords" placeholder="Search" class="form-control">
              </div>
              <input type="submit" value="Search" class="btn btn-success" data-disable-with="Search">
            </form>
          </nav>
        </div>
      </header>
      <div class="container">
        <nav class="col-md-12">
          <div>
            <ul class="nav justify-content-end">
              <li class="nav-item mr-auto"><a class="nav-link" href="/">Home</a></li>
              <li class="nav-item">
                <CartLink/>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>


    <div class="container">
      <div class="row" data-hook>
        <!--<%= breadcrumbs(@taxon) %>-->

        <!--<%= render partial: 'spree/shared/sidebar' if content_for? :sidebar %>-->

        <div id="content" class="col-sm-12" data-hook>
          <!--<%= flash_messages %>-->
          <nuxt/>
        </div>

        <!--<%= yield :templates %>-->
      </div>
    </div>
  </div>
</template>

<script>
  import CartLink from '~/components/CartLink.vue'

  export default {
    components: { CartLink }
  }
</script>

<style lang="scss">
  html {
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
  }

  #spree-header {
    background-color: #1c5c92;
    margin-bottom: 20px;

    header {
      background: rgba(34, 34, 34, 0.4);
      padding: 20px 0;

      .form-inline {
        .form-group {
          margin-right: 5px;
        }
      }
    }

    #logo {
      max-width: 100%;
      max-height: 50px;
    }

    .nav a {
      color: white;
      padding-top: 15px;
      padding-bottom: 15px;
    }
  }
</style>
