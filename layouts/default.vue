<template>
  <div class="wrapper">
    <div v-if="sidebarOpen" class="sidebar-backdrop" @click="sidebarOpen = false" />
    <LayoutsSidebar :is-expanded="sidebarOpen" />
    <div id="content-wrapper" :class="{ 'sidebar-collapsed': !sidebarOpen }">
      <nav class="navbar navbar-expand-lg sticky-top">
        <div class="container-fluid">
          <button type="button" class="btn btn-light d-md-none me-3" @click="toggleSidebar" >
          	<BIcon icon="bi:list" margin="2" />
          </button>
          
          <div class="d-flex ms-auto align-items-center">
            <button class="btn btn-sm me-3  d-none d-md-block">
							<span class="tour">Take a tour</span>             
            </button>
            
            <div class="dropdown me-3">
              <button id="messagesDropdown" class="btn btn-link text-muted position-relative" type="button"  data-bs-toggle="dropdown" aria-expanded="false">
								<BIcon icon="bi:envelope-fill" style="background: #382F90;" />
                <span class="notification-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  3
                </span>
              </button>
            </div>
            
            <div class="dropdown me-3">
              <button id="notificationsDropdown" class="btn btn-link text-muted position-relative" type="button" data-bs-toggle="dropdown" aria-expanded="false">
								<BIcon icon="bi:bell-fill" style="background: #382F9099;"/>
              </button>
            </div>
            
            <div class="dropdown">
              <button id="userDropdown" class="btn btn-link p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="~/assets/img/profile.jpg" alt="User" class="rounded-circle" width="40" height="40">
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div id="main-content" class="p-5">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

	const sidebarOpen = ref(true)

	const toggleSidebar = () => {
		sidebarOpen.value = !sidebarOpen.value
	}

	const checkWindowSize = () => {
      if (window.innerWidth < 768) {
        sidebarOpen.value = false
				console.log('sidebar hide')
      } else {
        sidebarOpen.value = true;
				console.log('sidebar open')
      }
    }

    // const logout = () => {
    //   this.$store.dispatch('auth/logout');
    //   this.$router.push('/login');
    // }

		onMounted(() => {
			checkWindowSize()
			window.addEventListener('resize', checkWindowSize)
		})

		onUnmounted(() => {
			window.removeEventListener('resize', checkWindowSize);
		})



</script>

<style scoped>
.wrapper {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

#content-wrapper {
  width: calc(100% - 250px);
  transition: all 0.3s;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

#content-wrapper.sidebar-collapsed {
  width: 100%;
}

#main-content {
  overflow-y: auto;
  flex: 1;
	background: #F5F5FB !important;
	padding: 40px 120px !important;
}

.navbar {
  height: 60px;
  padding: 0.5rem 1rem;
	background: #F5F5FB !important;
}

.dropdown-menu {
  min-width: 14rem;
  padding: 0.5rem 0;
  font-size: 0.85rem;
  border: none;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
}

.dropdown-header {
  font-weight: 600;
  padding: 0.5rem 1rem;
  color: #4e73df;
}


.tour {
	font-weight: 600;
	font-size: 1rem;
	color: #575758;
}

.notification-badge {
  top: 5px !important;
  left: 33px !important;
}

@media (max-width: 767.98px) {
  #content-wrapper, #content-wrapper.sidebar-collapsed {
    width: 100%;
  }
	#main-content {
	  padding: 0 !important;
  }
  .sidebar-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9998; /* below sidebar */
  }
}
</style>