<template>
  <main>
    <div class="envelope-list">
      <div class="envelope"
           v-for="envelope in curEnvelopes"
           :class="[envelope.type === 'ele' ? 'envelope--ele' : 'envelope--meituan']">
        <div class="envelope__header">
          <p class="envelope__title">
            <span class="icon-text"
                  :class="[envelope.type === 'ele' ? 'icon-ele' : 'icon-meituan']">
              {{envelope.type === 'ele' ? '饿了么' : '美团外卖'}}
            </span>
          </p>
          <p class="envelope__number">编号：{{envelope.number}}</p>
        </div>
        
        <div class="envelope__content">
          <p v-if="curView === 'meituan'">【美团外卖】第{{envelope.bonus}}个领取的人红包最大！</p>
          <p v-else>饿了么拼手气，第{{envelope.bonus}}个领取的人得大红包</p>

          <p>
            <span class="icon-text icon-progress icon-small">已领{{envelope.progress}}个</span>
          </p>
        </div>
        
        <div class="envelope__button">
          <span class="icon-text icon-envelope">领红包</span>
        </div>
      </div>
    </div>

    <div class="tab">
      <div class="tab-item"
           v-tap="{ methods: switchTab, view: 'meituan' }">
        <img v-if="curView === 'meituan'" src="../images/meituan.svg" alt="美团外卖">
        <img src="../images/meituan-unchoosen.svg" alt="美团外卖" v-else>
        <span>美团外卖</span>
      </div>
      <div class="tab-item"
           v-tap="{ methods: switchTab, view: 'ele' }">
        <img v-if="curView === 'ele'" src="../images/ele-choosen.svg" alt="饿了么">
        <img src="../images/ele-unchoosen.svg" alt="饿了么" v-else>
        <span>饿了么</span>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
  .envelope-list {
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .envelope {
    border: 1px solid #adaaaa;
    border-top: 2px solid #ffeb3b;
    padding: 0 10px;
    margin-bottom: 1.5rem;
    min-width: 300px;
    background: #fff;
  }

  .envelope--meituan {
    border-top: 2px solid #ffeb3b;
  }
  .envelope--ele {
    border-top: 2px solid #2196f3;
  }

  .envelope__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #c0c0c0;
    font-size: 1.5rem;
    padding: 1rem 0;
  }

  .envelope__title {
    color: #2196f3;
  }

  .envelope__content {
    text-align: center;
    height: 6rem;
    padding: 1.5rem 0;
  }

  .envelope__button {
    text-align: center;
    background: #73bd73;
    font-size: 1.5rem;
    padding: 1rem;
    margin: 0 -10px;
    color: #fff;
  }

  .icon-text {
    padding: 2.5px 0 2.5px 42px;
    background-position: 5px 0;
    background-repeat: no-repeat;
  }
  .icon-ele {
    background-image: url("../images/ele.svg");
  }
  .icon-meituan {
    background-image: url("../images/meituan.svg");
  }
  .icon-envelope {
    background-image: url("../images/envelope.svg");
  }
  .icon-progress {
    background-image: url("../images/taskProgress.svg");
  }

  .icon-small {
    background-size: 16px;
    padding: 0 0 0 22px;
    background-position: 3px 0;
  }

  .tab {
    font-size: .8rem;
    padding: 1rem 0;
    border-top: 1px solid #c0c0c0
  }
  .tab-item {
    display: inline-flex;
    flex-direction: column;
    width: 49%;
    align-items: center;
  }

  @media screen and (max-width: 1250px) {
    .envelope {
      width: 100%;
    }
  }

  @media screen and (min-width: 1251px) {
    .envelope {
      width: calc((100% - 1.5rem) / 4);
      margin-right: .5rem;
    }

    .envelope:nth-child(4n) {
      margin-right: 0;
    }
  }
</style>

<script>
  import Vue from 'vue'
  import vueTap from 'v-tap'
  Vue.use(vueTap)

  const apiGetJobs = '/getJobs'

  export default {
    name: 'envelope',

    data: function () {
      return {
        envelopes: [],

        curView: 'meituan'
      }
    },

    computed: {
      ele() {
        return this.envelopes.filter(envelop => envelop.type === 'ele')
      },

      meituan() {
        return this.envelopes.filter(envelop => envelop.type === 'meituan')
      },

      curEnvelopes() {
        return this.curView === 'ele' ? this.ele : this.meituan
      }
    },

    methods: {
      switchTab: function(params) {
        this.curView = params.view
      }
    },

    created() {
      const self = this

      this.$http.get(apiGetJobs)
      .then(response => {
        if (response.status === 200) {
          self.envelopes = response.body
        }
      })
    }
  }
</script>