/**
* Copyright (c) 2011-2016 Alexander Dickson @alexdickson
* Licensed under the MIT licenses.
* http://alexanderdickson.com
*
* Modified by Cain
*/
(function(factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"));
    } else {
        factory(jQuery);
    }
})(function($) {
    const pluginName = "waitForImages";

    $.waitForImages = {
        hasImageProperties: ["backgroundImage", "listStyleImage", "borderImage", "borderCornerImage", "cursor"],
        hasImageAttributes: ["srcset"]
    };

    $.expr[":"].hasSrc = (elem) => $(elem).is('img[src][src!=""]');
    $.expr[":"].uncached = (elem) => $(elem).is(":hasSrc") && !elem.complete;

    $.fn.waitForImages = function({ each = $.noop, finished = $.noop, waitForAll = false } = {}) {
        const deferred = $.Deferred();
        let allImages = [];
        let loadedCount = 0;

        const collectImages = (element) => {
            const $element = $(element);
            const regex = /url\(\s*(['"]?)(.*?)\1\s*\)/g;

            if ($element.is("img:hasSrc")) {
                allImages.push({ src: $element.attr("src"), element });
            }

            $.waitForImages.hasImageProperties.forEach((property) => {
                const cssValue = $element.css(property);
                if (!cssValue) return;

                let match;
                while ((match = regex.exec(cssValue))) {
                    allImages.push({ src: match[2], element });
                }
            });

            $.waitForImages.hasImageAttributes.forEach((attr) => {
                const attrValue = $element.attr(attr);
                if (attrValue) {
                    allImages.push({
                        src: $element.attr("src"),
                        srcset: attrValue,
                        element
                    });
                }
            });
        };

        const handleImageLoad = ({ src, element }, index, total) => {
            loadedCount++;
            each.call(element, loadedCount, total, true);
            if (loadedCount === total) {
                finished.call(this);
                deferred.resolveWith(this);
            }
        };

        this.each(function() {
            const $this = $(this);
            const elements = waitForAll ? $this.find("*").addBack() : $this.find("img:hasSrc");

            elements.each((_, elem) => collectImages(elem));
        });

        const totalImages = allImages.length;

        if (totalImages === 0) {
            finished.call(this);
            deferred.resolveWith(this);
        } else {
            allImages.forEach(({ src, element }) => {
                const img = new Image();
                img.onload = img.onerror = () => handleImageLoad({ src, element }, loadedCount, totalImages);
                img.src = src;
            });
        }

        return { allImgsLength: totalImages, deferred: deferred.promise() };
    };
});
