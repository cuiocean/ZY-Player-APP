<script>
import db from "./utils/database.js";
export default {
  onLaunch: function () {
    db.init('site')
    db.init('setting')
  },
  onShow: function () {
    // console.log('App Show')
  },
  onHide: function () {
    // console.log('App Hide')
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "uview-ui/index.scss";
</style>
