"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import User from "@/models/User"
import connectDb from "@/db/connectDb"


export const initiate = async (amount, to_username, paymentform) => {
    await connectDb()
    let user = await User.findOne({username: to_username})
    const secret = user.razorpaysecret

    var instance = new Razorpay({ key_id: user.razorpayid, key_secret: secret })

    let options = {
        amount:Number.parseInt(amount),
        currency:"INR",
    }
    // let x = await instance.orders.create(options)

    // await Payment.create({oid:x.id, amount:amount/100, to_user:to_username,name:paymentform.name,message:paymentform.message})
    // return x 

    try {
  const x = await instance.orders.create(options);
  console.log(x);

  await Payment.create({
    oid: x.id,
    amount: amount / 100,
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
  });

  return x;
} catch (err) {
  console.error("Razorpay Error:", err);
  throw err;
}
}

export const fetchuser = async (username)=>{
    await connectDb()
    // let u = await User.findOne({username:username})
    // let user = u.toObject({flattenObjectIds: true})
    // return user
    const user = await User.findOne({ username }).lean()

return JSON.parse(JSON.stringify(user))
}

// export const fetchpayments = async (username) =>{
//     await connectDb()
//     let p = await Payment.find({to_user:username,done:true}).sort({amount:-1}).limit(10).lean()
//     return p
// }

export const fetchpayments = async (username) => {
    await connectDb()

    const payments = await Payment.find({
        to_user: username,
        done: true
    })
    .sort({ amount: -1 })
    .limit(10)
    .lean()

    return JSON.parse(JSON.stringify(payments))
}

export const updateProfile = async (data, oldusername) =>{
    await connectDb()
    let ndata = Object.fromEntries(data)

    if(oldusername !==ndata.username){
        let u = await User.findOne({username:ndata.username})
        if(u){
            return {error:"username already exits"}
        }
        await User.updateOne({email:ndata.email},ndata)
        await Payment.updateMany({to_user:oldusername},{to_user:ndata.username})
    }
    else{
        await User.updateOne({email:ndata.email},ndata)
    }
}




// "use server";

// import Razorpay from "razorpay";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";
// import Payment from "@/models/Payment";
// import User from "@/models/User";
// import Post from "@/models/Post";
// import Comment from "@/models/Comment";
// import Like from "@/models/Like";
// import connectDb from "@/db/connectDb";

// export const initiate = async (amount, tousername, paymentform) => {
//   await connectDb();

//   const user = await User.findOne({ username: tousername });
//   if (!user) {
//     throw new Error("Creator not found");
//   }

//   const secret = user.razorpaysecret;

//   const instance = new Razorpay({
//     key_id: user.razorpayid,
//     key_secret: secret,
//   });

//   const options = {
//     amount: Number.parseInt(amount),
//     currency: "INR",
//   };

//   try {
//     const x = await instance.orders.create(options);

//     await Payment.create({
//       oid: x.id,
//       amount: amount / 100,
//       to_user: tousername,
//       name: paymentform.name,
//       message: paymentform.message,
//     });

//     return JSON.parse(JSON.stringify(x));
//   } catch (err) {
//     console.error("Razorpay Error:", err);
//     throw err;
//   }
// };

// export const fetchuser = async (username) => {
//   await connectDb();

//   const user = await User.findOne({ username }).lean();
//   return JSON.parse(JSON.stringify(user));
// };

// export const fetchpayments = async (username) => {
//   await connectDb();

//   const payments = await Payment.find({ touser: username, done: true })
//     .sort({ amount: -1 })
//     .limit(10)
//     .lean();

//   return JSON.parse(JSON.stringify(payments));
// };

// export const updateProfile = async (data, oldusername) => {
//   await connectDb();

//   const ndata = Object.fromEntries(data);

//   if (oldusername !== ndata.username) {
//     const u = await User.findOne({ username: ndata.username });
//     if (u) {
//       return { error: "username already exists" };
//     }

//     await User.updateOne({ email: ndata.email }, ndata);
//     await Payment.updateMany({ touser: oldusername }, { touser: ndata.username });
//     await Post.updateMany({ creator: oldusername }, { creator: ndata.username });
//   } else {
//     await User.updateOne({ email: ndata.email }, ndata);
//   }

//   return { success: true };
// };

// /* =========================
//    POSTS ACTIONS
// ========================= */

// export const createPost = async (formData) => {
//   await connectDb();

//   const session = await getServerSession(authOptions);
//   if (!session?.user?.email) {
//     throw new Error("Unauthorized");
//   }

//   const dbUser = await User.findOne({ email: session.user.email }).lean();
//   if (!dbUser) {
//     throw new Error("User not found");
//   }

//   const title = formData.get("title")?.toString().trim() || "";
//   const content = formData.get("content")?.toString().trim() || "";
//   const image = formData.get("image")?.toString().trim() || "";

//   if (!content) {
//     throw new Error("Content is required");
//   }

//   const post = await Post.create({
//     creator: dbUser.username,
//     title,
//     content,
//     image,
//   });

//   return JSON.parse(JSON.stringify(post));
// };

// export const updatePost = async ({ postId, title, content, image }) => {
//   await connectDb();

//   const session = await getServerSession(authOptions);
//   if (!session?.user?.email) {
//     throw new Error("Unauthorized");
//   }

//   const dbUser = await User.findOne({ email: session.user.email }).lean();
//   if (!dbUser) {
//     throw new Error("User not found");
//   }

//   const post = await Post.findById(postId);
//   if (!post) {
//     throw new Error("Post not found");
//   }

//   if (post.creator !== dbUser.username) {
//     throw new Error("You can only edit your own posts");
//   }

//   post.title = title?.trim() || "";
//   post.content = content?.trim() || "";
//   post.image = image?.trim() || "";

//   if (!post.content) {
//     throw new Error("Content is required");
//   }

//   await post.save();

//   return { success: true };
// };

// export const deletePost = async (postId) => {
//   await connectDb();

//   const session = await getServerSession(authOptions);
//   if (!session?.user?.email) {
//     throw new Error("Unauthorized");
//   }

//   const dbUser = await User.findOne({ email: session.user.email }).lean();
//   if (!dbUser) {
//     throw new Error("User not found");
//   }

//   const post = await Post.findById(postId);
//   if (!post) {
//     throw new Error("Post not found");
//   }

//   if (post.creator !== dbUser.username) {
//     throw new Error("You can only delete your own posts");
//   }

//   await Post.findByIdAndDelete(postId);
//   await Comment.deleteMany({ postId });
//   await Like.deleteMany({ postId });

//   return { success: true };
// };

// export const fetchPosts = async (username) => {
//   await connectDb();

//   const session = await getServerSession(authOptions);
//   let currentUsername = null;

//   if (session?.user?.email) {
//     const dbUser = await User.findOne({ email: session.user.email }).lean();
//     currentUsername = dbUser?.username || null;
//   }

//   const posts = await Post.find({ creator: username })
//     .sort({ createdAt: -1 })
//     .lean();

//   const postIds = posts.map((post) => post._id);

//   const comments = await Comment.find({ postId: { $in: postIds } })
//     .sort({ createdAt: -1 })
//     .lean();

//   const likes = await Like.find({ postId: { $in: postIds } }).lean();

//   const commentsMap = {};
//   for (const comment of comments) {
//     const key = comment.postId.toString();
//     if (!commentsMap[key]) commentsMap[key] = [];
//     commentsMap[key].push({
//       ...comment,
//       _id: comment._id.toString(),
//       postId: comment.postId.toString(),
//     });
//   }

//   const likesMap = {};
//   for (const like of likes) {
//     const key = like.postId.toString();
//     if (!likesMap[key]) likesMap[key] = [];
//     likesMap[key].push(like.username);
//   }

//   const normalizedPosts = posts.map((post) => {
//     const postId = post._id.toString();
//     const likedByUsers = likesMap[postId] || [];

//     return {
//       ...post,
//       _id: postId,
//       comments: commentsMap[postId] || [],
//       commentsCount: (commentsMap[postId] || []).length,
//       likes: likedByUsers.length,
//       likedByCurrentUser: currentUsername ? likedByUsers.includes(currentUsername) : false,
//     };
//   });

//   return JSON.parse(JSON.stringify(normalizedPosts));
// };

// export const likePost = async (postId) => {
//   await connectDb();

//   const session = await getServerSession(authOptions);
//   if (!session?.user?.email) {
//     throw new Error("Please login to like posts");
//   }

//   const dbUser = await User.findOne({ email: session.user.email }).lean();
//   if (!dbUser) {
//     throw new Error("User not found");
//   }

//   const existingLike = await Like.findOne({
//     postId,
//     username: dbUser.username,
//   });

//   if (existingLike) {
//     return { liked: true };
//   }

//   await Like.create({
//     postId,
//     username: dbUser.username,
//   });

//   const totalLikes = await Like.countDocuments({ postId });
//   await Post.findByIdAndUpdate(postId, { likes: totalLikes });

//   return {
//     liked: true,
//     likes: totalLikes,
//   };
// };

// export const unlikePost = async (postId) => {
//   await connectDb();

//   const session = await getServerSession(authOptions);
//   if (!session?.user?.email) {
//     throw new Error("Please login to unlike posts");
//   }

//   const dbUser = await User.findOne({ email: session.user.email }).lean();
//   if (!dbUser) {
//     throw new Error("User not found");
//   }

//   await Like.findOneAndDelete({
//     postId,
//     username: dbUser.username,
//   });

//   const totalLikes = await Like.countDocuments({ postId });
//   await Post.findByIdAndUpdate(postId, { likes: totalLikes });

//   return {
//     liked: false,
//     likes: totalLikes,
//   };
// };

// export const fetchComments = async (postId) => {
//   await connectDb();

//   const comments = await Comment.find({ postId })
//     .sort({ createdAt: -1 })
//     .lean();

//   return JSON.parse(
//     JSON.stringify(
//       comments.map((comment) => ({
//         ...comment,
//         _id: comment._id.toString(),
//         postId: comment.postId.toString(),
//       }))
//     )
//   );
// };

// export const addComment = async ({ postId, comment }) => {
//   await connectDb();

//   const session = await getServerSession(authOptions);
//   if (!session?.user?.email) {
//     throw new Error("Please login to comment");
//   }

//   const dbUser = await User.findOne({ email: session.user.email }).lean();
//   if (!dbUser) {
//     throw new Error("User not found");
//   }

//   const trimmedComment = comment?.trim();
//   if (!trimmedComment) {
//     throw new Error("Comment cannot be empty");
//   }

//   const newComment = await Comment.create({
//     postId,
//     username: dbUser.username,
//     comment: trimmedComment,
//   });

//   return JSON.parse(
//     JSON.stringify({
//       ...newComment.toObject(),
//       _id: newComment._id.toString(),
//       postId: newComment.postId.toString(),
//     })
//   );
// };
