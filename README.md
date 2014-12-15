Moduly: Making easy responsive page modules possible
====================================================

Moduly is a jQuery plugin that makes it possible to easily create responsive page modules. This means you declare the layout of an element of the page based on the size of the element, not the size of the page. This way you can drop that element into any size container on the page and have it look good.

Think of it this way. With responsive web design you define the overall layout of the page when the page dimensions change. With responsive page modules you define the changes to the individual elements on the page. Moduly let's you create the latter now. Hopefully something similar will make it into the CSS spec one day, but for now, we'll have to do with things like this plugin.

One major thing to take into account at this moment: Moduly is a proof of concept for Responsive Page Modules. It has not yet been battle tested.


What can I use it for?
----------------------

Moduly has the most benefits if you have an element in your website that might get used in multiple places in the website or if the website layout is going to change. Moduly will save you a lot of headaches by making CSS more maintainable and simpler. There is just less code to write.

Like stated before: Moduly is a proof of concept, but I hope it will grow into something many people will love to use. The only way to make this happen is if we build it together. So if you want to contribute; go to Github, play with it and tell me what you miss, what needs to improve or just what you think of it in general. Even better send me some pull request ;)


How to use it
-------------

Using Moduly is pretty simple: You include jQuery and the Moduly plugin with code like this:

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="moduly.js"></script>

Here's some example HTML for the element we would like to style:

    <div class="generic-container">
        <form class="contact-form">
            <!-- form code -->
        </form>
    </div>

The important element here is `.contact-form`.

If you want to style an element based on it's own width, you can prefix it with a special Moduly class. So if we want to change to .contact-form layout when it's wider than 500 pixels. We write CSS like this:

    .moduly-min-width-500.contact-form{
        /* This only gets applied if .contact-form is 500 pixels or wider */
    }

Moduly works great with the nesting features LESS and SASS, since you only have to write the Moduly class once.

You can also create more min-width Moduly selectors like this:

    .moduly-min-width-500.contact-form{
        /* This only gets applied if .contact-form is 500 pixels or wider */
    }
    .moduly-min-width-900.contact-form{
        /* This only gets applied if .contact-form is 900 pixels or wider,
           This is in addition to the styles already applied with the min-width-500 selector */
    }

The biggest difference with regular responsive web design is that you style an element based on it's own width, not the window width. So it doesn't matter in what container the element is shown. It will always look good.


Demo
----

You can view [a demo here](http://paulsprangers.com/stuff/moduly/) or check the index.html in the repository. It's a pretty bad page (unless you're the marketing team behind it) and the CSS is bad as well, but it demonstrates the plugin well.


How does it work
----------------

Moduly gets your CSS selectors and (currently just) looks for a selector with the `.moduly-min-width-[int]` format. It takes note of the `[int]` value and then checks which CSS selector comes after the keyword. A data attribute is added the the elements matching the selector noting the min-width value and if more are found in non-processed moduly selectors they are appended.

After this is done (and on every window resize event) Moduly will walk through all the elements with the new moduly data attribute, check the elements size, check to see if that exceeds a min-width value and if that's the case add a moduly class matching the moduly selector to that element.

So if you have a `.contact-form` element which width exceeds 500 pixels and you have defined `.moduly-min-width-500.contact-form` in your CSS. The `.moduly-min-width-500` class will be added to the `.contact-form` element.

One benefit of how Moduly works, is that your base styling is always applied to your element, even if Moduly fails.


Caveats
-------
* This code has in no way been battle tested
* The selectors following the .moduly-min-width-xx class can only be classes or ids. They can be combined (as in, not separated by a space), but deeper selectors are not supported. That is mainly due to my lack of reggae skills. This should not be a problem since a module probably has a identifying class.
* Currently there is no Internet Explorer support below IE10.
* There is only support for min-width. That's not a problem if you work mobile-first. Adding max-width is pretty trivial
* You must write the moduly selectors in the order of small to large. Because of source order being an influence in how CSS is applied, this gives the most predictable results.
* Moduly only checks your CSS once, on page load. It then binds itself to the elements found in the CSS. If you dynamically add elements to your page, Moduly will not handle them. You can re-fire Moduly manually with $(document).moduly(); if you want though, but there might be some unknown downsides to that.

I'm going to fix bugs and add features of course and I'll use it in some of my projects for work so it'll get better over time. Check the Github repo for updates.