import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

const key = 'api/blogs/'
const comments = '/comments'
class BlogService {
  async getBlogs() {
    try {
      const res = await api.get(key)
      AppState.blogs = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async getMyBlogs(id) {
    try {
      AppState.myBlogs = AppState.blogs.find(s => s.creater.id === id)
    } catch (error) {
      logger.error(error)
    }
  }

  async getOneBlog(id) {
    try {
      const res = await api.get(key + id)
      logger.log(res.data)
      AppState.activeBlog = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async getBlogComments(id) {
    try {
      const res = await api.get(key + id + comments)
      logger.log(res.data)
      AppState.activeBlogComments = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async createBlog(blogData) {
    const res = await api.post('api/blogs', blogData)
    logger.log(res)
    this.getBlogs()
  }

  async createComment(commentData, id) {
    commentData.blog = id
    logger.log(commentData)

    const res = await api.post('api/comments', commentData)
    logger.log(res.data)
    this.getBlogComments(id)
  }

  async editBlog(id, edit) {
    const blogData = { body: edit }
    const res = await api.put(key + id, blogData)
    logger.log(res)
  }

  async editComment(id, edit) {
    const commentData = { body: edit }
    const res = await api.put('api/comments/' + id, commentData)
    logger.log(res.data)
  }

  async deleteBlog(id) {
    await api.delete(key + id)
    this.getBlogs()
  }

  async deleteComment(commentId, blogId) {
    await api.delete('api/comments/' + commentId)
    this.getBlogComments(blogId)
  }
}
export const blogService = new BlogService()
