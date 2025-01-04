import React from 'react'

  const PendingMessage = (props) => {
    if (props.allblogs.isLoading) {
      return <div>Pending</div>
    } else if (props.allblogs.status != 'success') {
      return <div>There was an error loading the blogs</div>
    }
    if (props.allblogs.isError) {
      console.log("There was React-Query related error fetching allblogs")
    }
    return null
  }

export default PendingMessage
