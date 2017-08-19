let waitDirectoryData = {
  watch: {
    directory () {
      if (this.directory.length > 0) {
        this.$store.commit('mutateActivityIndicator', false)
      }
    }
  }
}

export default waitDirectoryData
