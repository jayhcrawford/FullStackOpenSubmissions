const dummy = (blogs) => {
    if (Array.isArray(blogs)) {
        return 1;
    } else {
        return 0;
    }
}

const globalTotalLikes = (blogs) => {
    let sum = 0;
    blogs.forEach((blog) => {
        sum += blog.likes;
    })
    return sum;
}

const mostLikedBlog = (blogs) => {
    mostLiked = {}
    let highestLikeCount = 0

    blogs.forEach((blog) => {
        if (blog.likes > highestLikeCount) {
            highestLikeCount = blog.likes;
            mostLiked = blog;
        }
    })

    return mostLiked;
}

const mostPosts = (blogs) => {
    const authorMap = new Map();
    const authorReturned = {
        author: "",
        blogs: 0
    }
    let highestBlogs = 0

    function checkHighestBlogCount(author, blogCount) {
        if (blogCount > highestBlogs) {
            //update overall highest value
            highestBlogs = blogCount

            //update author with currently highest count
            authorReturned.author = author
            authorReturned.blogs = blogCount
        }

    }

    blogs.forEach((blog) => {

        //if author is already in the map
        if (authorMap.has(blog.author)) {
            //increment that author's blog count
            authorMap.set(blog.author, authorMap.get(blog.author) + 1)

            checkHighestBlogCount(blog.author, authorMap.get(blog.author))
        } else {
            //else create a new key value pair in the map
            authorMap.set(blog.author, 1)
            checkHighestBlogCount(blog.author, authorMap.get(blog.author))
        }
    })

    return authorReturned
}

const mostLikedAuthor = (blogs) => {
    const authorMap = new Map();
    const authorReturned = {
        author: "",
        likes: 0
    }
    let highestLikes = 0

    function checkHighestLikes(author, likeCount) {
            if (likeCount > highestLikes) {
                //if higher than previous record, set new record
                highestLikes = likeCount

                //set authorReturned to latest max
                authorReturned.author = author;
                authorReturned.likes = likeCount;
            }
        }


        blogs.forEach((blog) => {

            //if author is already in the map
            if (authorMap.has(blog.author)) {
                //increment that author's like count
                authorMap.set(blog.author, authorMap.get(blog.author) + blog.likes)
    
                checkHighestLikes(blog.author, authorMap.get(blog.author))
            } else {
                //else create a new key value pair in the map
                authorMap.set(blog.author, blog.likes)
                checkHighestLikes(blog.author, authorMap.get(blog.author))
            }
        })
        return authorReturned
    }





module.exports = {
    dummy, globalTotalLikes, mostLikedBlog, mostPosts, mostLikedAuthor
}