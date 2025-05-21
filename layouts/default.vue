<template>
  <div class="wrapper">
    <LayoutsSidebar :is-expanded="sidebarOpen" />
    <div id="content-wrapper" :class="{ 'sidebar-collapsed': !sidebarOpen }">
      <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
        <div class="container-fluid">
          <button type="button" class="btn btn-light d-md-none me-3" @click="toggleSidebar" >
          	<BIcon icon="bi:list" margin="2" />
          </button>
          <a class="navbar-brand d-md-none" href="#">MedicalApp</a>
          
          <div class="d-flex ms-auto align-items-center">
            <button class="btn btn-sm btn-outline-secondary me-3 d-none d-md-block">
              Take a tour
            </button>
            
            <div class="dropdown me-3">
              <button id="messagesDropdown" class="btn btn-link text-muted position-relative" type="button"  data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-envelope fs-5"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  3 {{sidebarOpen ? 'true' : 'false'}}
                  <span class="visually-hidden">unread messages</span>
                </span>
              </button>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="messagesDropdown">
                <li><h6 class="dropdown-header">Recent Messages</h6></li>
                <li><a class="dropdown-item" href="#">New appointment request</a></li>
                <li><a class="dropdown-item" href="#">Test results available</a></li>
                <li><a class="dropdown-item" href="#">Prescription renewal</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">View all messages</a></li>
              </ul>
            </div>
            
            <div class="dropdown me-3">
              <button class="btn btn-link text-muted position-relative" type="button" id="notificationsDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-bell fs-5"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  5
                  <span class="visually-hidden">unread notifications</span>
                </span>
              </button>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="notificationsDropdown">
                <li><h6 class="dropdown-header">Recent Notifications</h6></li>
                <li><a class="dropdown-item" href="#">Medical record updated</a></li>
                <li><a class="dropdown-item" href="#">Appointment confirmed</a></li>
                <li><a class="dropdown-item" href="#">Payment received</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">View all notifications</a></li>
              </ul>
            </div>
            
            <div class="dropdown">
              <button class="btn btn-link p-0" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://ui-avatars.com/api/?name=Doctor&background=4e73df&color=fff" alt="User" class="rounded-circle" width="40" height="40">
              </button>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li><h6 class="dropdown-header">Dr. John Smith</h6></li>
                <li><a class="dropdown-item" href="#">Profile</a></li>
                <li><a class="dropdown-item" href="#">Settings</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" @click="logout">Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div id="main-content" class="p-4 bg-light">
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
      // Auto-collapse sidebar on small screens
      if (window.innerWidth < 768) {
        sidebarOpen.value = false
				console.log('sidebar hide')
      } else {
        sidebarOpen.value = true;
				console.log('sidebar open')
      }
    }

    const logout = () => {
    //   this.$store.dispatch('auth/logout');
    //   this.$router.push('/login');
    }

		onMounted(() => {
			// Check if the user is authenticated when the app loads
			checkWindowSize()
			window.addEventListener('resize', checkWindowSize)
		})

		onUnmounted(() => {
  // Clean up event listener
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
}

.navbar {
  height: 60px;
  padding: 0.5rem 1rem;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
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

@media (max-width: 767.98px) {
  #content-wrapper, #content-wrapper.sidebar-collapsed {
    width: 100%;
  }
}
</style>