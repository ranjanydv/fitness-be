const { eq } = require('drizzle-orm');
const createError = require('http-errors');
const multer = require('multer');

const db = require('../db/connect');
const { user, blog } = require('../db/schema');
const catchAsync = require('../utils/catchAsync');
const path = require('node:path');
const { uuid } = require('drizzle-orm/pg-core');

// Setup storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Set the destination directory (adjust as needed)
  },
  filename: function (req, file, cb) {
    // Create a custom filename with the original extension
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});
// Initialize multer with the storage configuration
const upload = multer({ storage: storage }).single('file');


const createBlog = catchAsync(async (req, res) => {
  const { title, slug, content, featuredImage } = req.body;

  if (!title || !slug || !content) {
    throw createError(400, 'Provide all fields');
  }

  const slugExists = await db.select().from(blog).where(eq(blog.slug, slug));
  if (slugExists.length > 0) {
    throw createError(409, 'Blog with slug already exists');
  }
  const newBlog = await db.insert(blog).values({
    title,
    slug,
    content,
    featuredImage: featuredImage ? featuredImage : '/uploads/puremotion.jpg',
  }).returning({
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    content: blog.content,
    featuredImage: blog.featuredImage,
  });
  return { message: 'Blog Created successfully',bog:newBlog };
});


const getBlogs = catchAsync(async (req, res) => {
  const blogs = await db.select().from(blog);
  return { blogs };
});

const getBlogByID = catchAsync(async (req, res) => {
  const { id } = req.params;
  const blogData = await db.select().from(blog).where(eq(blog.id, id));
  if(blogData.length === 0) throw createError(404, `Blog with id ${id} not found`);
  return { blog: blogData };
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const blogData = await db.delete(blog).where(eq(blog.id, id));
  return { message:"Blog Deleted Successfully" };
});

async function uploadProductImage(req, res, next) {
  try {
    upload(req, res, async function (err) {
      if (err) {
        console.log(err);
        return res.status(400).send('File has some error');
      }
      const file = req.file;
      const data = {
        file: file.filename,
      };
      console.log(file);
      res.status(201).json({ status: 200, message: 'Product Image Created', image: file });
    });
  } catch (error) {
    res.status(400).send('Upload Error');
  }
}

module.exports = { createBlog, getBlogs, getBlogByID, uploadProductImage,deleteBlog };