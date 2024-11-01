<a id="readme-top"></a>

<div align="center">
  <img height="200" src="https://raw.githubusercontent.com/EstebanUCR/Infinity_Fashion/refs/heads/stage1Project/infinity_fashion/src/assets/Home/logo.png"  />
</div>

###

<h1 align="center">INFINITY FASHION</h1>

###

## Team members
Esteban Iglesias Vargas - C03913<br>
Johana Wu Nie - C08591<br>
Pablo Rodríguez Navarro - B66060<br>
Paola Alexandra Feng Wu - C22884<br>

###

Project of the Web Application Development course CI-0137 of the UCR.<br>
It consists of the creation of a virtual store of high quality women's clothing, where the knowledge acquired in the course is applied.<br><br>
The [identity manual](https://drive.google.com/file/d/1wuHNlB9XpuQO-Sg6PUW5JpCMAIztyfyt/view?usp=sharing) defines important design details such as the logo, primary and secondary colors, as well as typography.<br><br>
In the [moodboard](https://miro.com/welcomeonboard/YVJYdEhocWNNUktjNHFnUDFlVFEyd2xUUTRKTWtISXUzR1kzMDQyZ3FET2xNaUVIZlJKVWgzaWJDMDFYV1VrcXwzNDU4NzY0NTI0ODk1NjQ1ODQ0fDI=?share_link_id=804363808267) you can visualize the brainstorming that was discussed about the essence of the site, We also have a sitemap that helps developers understand the structure of the site [MapSite](https://app.diagrams.net/#G1QiA9apxC77bNKnrP6CQWWQXdFD2p6cYL) and a usage guide for users [User Guide](https://www.canva.com/design/DAGSqp_VKng/ZUG9lJQ0J3WJD2ygRNW1aA/edit).

The site in production can be seen in [this link](https://extraordinary-douhua-fdc1a5.netlify.app/).

###

## Tech
<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="react logo"  />
  <img width="20" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" alt="typescript logo"  />
  <img width="20" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="40" alt="html5 logo"  />
  <img width="20" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="40" alt="css3 logo"  />
  <img width="20" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" height="40" alt="bootstrap logo"  />
</div>

###

## How to run

Once the repository is downloaded, the dependencies must be installed:
```sh
npm install
```

A server must be run for login authentication to proceed correctly for this:
```sh
cd .\server
node .\server.js
```

Once they are installed, you can run it in a local environment:
```sh
npm run dev
```

###

## Stages

### Second stage 
The following features were implemented for this stage:
* Functional login and registration.
* Visual and responsive design improvements.
* Change of the cart position in mobile versions.
* When logging in, user information is displayed and option to log out.
* Only if logged in allows to add items to the cart
* If you log out without finalizing the purchase, the cart you had so far is saved and loaded when you log in again.
* Card payment form is added.
* At the end of the purchase, an order is generated and saved, the user empties the cart and is sent to the home page.


### First stage
The following features were implemented for this stage:
* Header with navigation menu.
* Login and registration page (without functionality).
* Product search.
* Home page containing best sellers and new arrivals.
* Product filtering according to category.
* Product view according to category.
* Detailed product view.
* Functional shopping cart.
* Footer (without functionality).

###

<p align="right">(<a href="#readme-top">Back to top</a>)</p>
