const { eq } = require('drizzle-orm');
const createError = require('http-errors');

const db = require('../db/connect');
const { user, blog } = require('../db/schema');
const catchAsync = require('../utils/catchAsync');


const createBlog = catchAsync(async (req, res) => {
  const { title, slug, content, featuredImage } = req.body;

  if (!title || !slug || !content) {
    throw createError(400, 'Provide all fields');
  }

  const slugExists = await db.select().from(blog).where(eq(blog.slug, slug));
  if (slugExists.length > 0) {
    throw createError(409, 'Blog with slug already exists');
  }

  const newBlog = await db.insert(blog).values(
    {
      title: title,
      slug: slug,
      content: content,
      featuredImage: featuredImage ? featuredImage : '/uploads/puremotion.jpg',
      // userId
    }
  ).returning({
    title: blog.title,
    slug: blog.slug,
    content: blog.content,
    featuredImage: featuredImage,
    // userId: blog.userId,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
  });
  return { message: 'Blog Created successfully', user: newBlog };
});


const getBlogs = catchAsync(async (req, res) => {
  const blogs = await db.select().from(blog);
  return { blogs };
});

const getBlogByID = catchAsync(async (req, res) => {
  const {id} = req.params;
  const blogData = await db.select().from(blog).where(eq(blog.id, id));
  return { blog:blogData };
});


module.exports = { createBlog, getBlogs,getBlogByID };