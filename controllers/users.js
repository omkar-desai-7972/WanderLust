
const User=require("../models/user")

module.exports.renderSignupForm=(req, res) => {
    res.render("./users/user.ejs")
}

module.exports.signup=async (req, res) => {
    try {
        let { email, username, password } = req.body;
        const newUser = new User({
            email: email,
            username: username,
        })
        let registeredUser = await User.register(newUser, password)

        //When we signup it automatically logins
        
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
        req.flash("success", "Welcome to WanderLust")
        res.redirect("/listings");
        })
        
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup")
    }

}
module.exports.renderLoginForm=(req, res) => {
    res.render("./users/login.ejs")
}

module.exports.login=async (req, res) => {
    req.flash("success", "Welcome Back to WanderLust !");
    let redirectUrl=res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
}

module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
      if(err){
          return next(err);
      }
      req.flash("success","You are LoggedOut!")
      res.redirect("/listings");
    })
  }

