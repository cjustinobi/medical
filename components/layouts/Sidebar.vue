<template>
  <aside id="sidebar" ref="sidebarRef" :class="{ 'collapsed': !sidebarExpanded }">
    <div class="sidebar-body">
      <ul class="nav flex-column">
        <li class="nav-item">
          <nuxt-link to="/" class="nav-link" :class="{ 'active': isActive('/') }">
            <BIcon icon="bi:grid" margin="2" />
            <span class="menu-text">Dashboard</span>
          </nuxt-link>
        </li>
        
        <li class="nav-item">
          <nuxt-link to="/#" class="nav-link" :class="{ 'active': isActive('/#') }">
            <BIcon icon="bi:person" margin="2" />
            <span class="menu-text">Profile</span>
          </nuxt-link>
        </li>
        
        <li class="nav-item">
          <nuxt-link to="/#" class="nav-link" :class="{ 'active': isActive('/#') }">
            <BIcon icon="bi:clipboard-check" margin="2" />
            <span class="menu-text">Services</span>
          </nuxt-link>
        </li>
        
        <li class="nav-item">
          <nuxt-link to="/#" class="nav-link" :class="{ 'active': isActive('/#') }">
            <BIcon icon="bi:file-earmark-medical" margin="2" />
            <span class="menu-text">Medical Records</span>
          </nuxt-link>
        </li>
        
        <li class="nav-item">
          <nuxt-link to="/#" class="nav-link" :class="{ 'active': isActive('/#') }">
            <BIcon icon="bi:wallet2" margin="2" />
            <span class="menu-text">Care Wallet</span>
          </nuxt-link>
        </li>
        
        <li class="nav-item">
          <nuxt-link to="/#" class="nav-link" :class="{ 'active': isActive('/#') }">
            <BIcon icon="bi:chat-left-text" margin="2" />
            <span class="menu-text">Messages</span>
          </nuxt-link>
        </li>
        
        <li class="nav-item">
          <nuxt-link to="/#" class="nav-link" :class="{ 'active': isActive('/#') }">
            <BIcon icon="bi:journal-bookmark" margin="2" />
            <span class="menu-text">Resources</span>
          </nuxt-link>
        </li>
      </ul>
      
      <div class="sidebar-divider my-3" />
      
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <nuxt-link to="/account-settings" class="nav-link" :class="{ 'active': isActive('/account-settings') }">
            <BIcon icon="bi:gear" margin="2" />
            <span class="menu-text">Account Settings</span>
          </nuxt-link>
        </li>
        
        <li class="nav-item">
          <nuxt-link to="/contact-support" class="nav-link" :class="{ 'active': isActive('/contact-support') }">
            <BIcon icon="bi:headset" margin="2" />
            <span class="menu-text">Contact Support</span>
          </nuxt-link>
        </li>
        
        <li class="nav-item">
          <a href="#" class="nav-link" @click.prevent="logout">
            <BIcon icon="bi:box-arrow-right" margin="2" />
            <span class="menu-text">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
  const props = defineProps({
    isExpanded: {
      type: Boolean,
      required: true
    }
  })

  const router = useRouter()
  const route = useRoute()
  const emit = defineEmits(['update:isExpanded'])
  const sidebarRef = ref<HTMLElement | null>(null)

  const sidebarExpanded = computed({
    get: () => props.isExpanded,
    set: (value) => emit('update:isExpanded', value)
  })

  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.value && !sidebarRef.value.contains(event.target as Node)) {
      sidebarExpanded.value = false
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })

  const isActive = (path: string) => route.path === path

  const logout = () => {
    // authStore.logout()
    router.push('/login')
  }

  watch(() => route.path, () => {
    sidebarExpanded.value = false
  })


</script>

<style scoped>
#sidebar {
  min-width: 250px;
  max-width: 250px;
  color: #fff;
  transition: all 0.3s;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 999;
}

#sidebar.collapsed {
  margin-left: -250px;
}

.sidebar-header {
  padding: 15px 20px;
  background: #4668c9;
  display: flex;
  align-items: center;
  height: 60px;
}

.sidebar-body {
  padding: 120px 0;
  overflow-y: auto;
  flex: 1;
}

.sidebar-divider {
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.nav-link {
  color: #A0A0A0;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  transition: all 0.3s;
}

.nav-link.active, .nav-link.active:hover {
  color: #fefefe;
  background: rgba(255, 255, 255, 0.1);
}

.nav-link:hover{
  color: rgb(83, 82, 82);
  background: rgba(255, 255, 255, 0.1);
}

.nav-link i {
  width: 24px;
  text-align: center;
  font-size: 1.1rem;
}

@media (max-width: 767.98px) {
  #sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 9999;
    background: #f1f3f9;
  }
  
  #sidebar.collapsed {
    margin-left: 250;
  }
}
</style>