<template>
  <div id="choiceGenresContent">
    <div v-if="isLogged">
      <transition name="animateOpacity" appear>
        <md-card class="md-layout-item md-small-size-100">
          <md-card-content> 
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-list>
                  <md-list-item>
                    <md-checkbox v-model="notification" value="detective" class="md-primary" />
                    <span class="md-list-item-text">Детектив</span>
                  </md-list-item>

                  <md-list-item>
                    <md-checkbox v-model="notification" value="fantasy" class="md-primary"/>
                    <span class="md-list-item-text">Фантастика / фэнтези</span>
                  </md-list-item>

                  <md-list-item>
                    <md-checkbox v-model="notification" value="educational" class="md-primary" />
                    <span class="md-list-item-text">Учебная лит-ра</span>
                  </md-list-item>

                  <md-list-item>
                    <md-checkbox v-model="notification" value="comics" class="md-primary" />
                    <span class="md-list-item-text">Комиксы / манга</span>
                  </md-list-item>

                  <md-list-item>
                    <md-checkbox v-model="notification" value="humorous" class="md-primary" />
                    <span class="md-list-item-text">Юмористическая лит-ра</span>
                  </md-list-item>

                  <md-list-item>
                    <md-checkbox v-model="notification" value="horrors" class="md-primary" />
                    <span class="md-list-item-text">Ужасы / мистика</span>
                  </md-list-item>
                  
                  <md-list-item>
                    <md-checkbox v-model="notification" value="amorous" class="md-primary" />
                    <span class="md-list-item-text">Любовные романы</span>
                  </md-list-item>

                  <md-list-item>
                    <md-checkbox v-model="notification" value="historical" class="md-primary" />
                    <span class="md-list-item-text">Историческая лит-ра</span>
                  </md-list-item>
                </md-list>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </transition>
    </div>
    <div v-else class="display">
      <span class="md-display-3">{{ textNotLoggedUser }}</span>
    </div>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  name: 'Controls',
  data: () => ({
    notification: [],
    isLogged: 0,
    textNotLoggedUser: ''
  }),
  methods: {
    isLoggedUser() {
      axios({
        method: "post",
        url: "ajax/isLogged.php"
      })
      .then(response => {
        if (response.data == 1) {
          this.isLogged = 1
        } else {
          this.isLogged = 0,
          this.textNotLoggedUser = 'Войдите в аккаунт'
        }
      })
    }
  },
  created() {
    this.isLoggedUser()
  }
}
</script>

<style scoped>
#choiceGenresContent {
  max-width: 550px;
  margin: 0 auto;
}
.md-list {
  width: 290px;
  margin: 0 auto;
  margin-bottom: 20px;
}
.md-checkbox {
  margin-right: 25px !important;
}
.display {
  text-align: center;
  margin-top: 50px;
}
</style>