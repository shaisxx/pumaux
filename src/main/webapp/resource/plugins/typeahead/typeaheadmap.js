/* =============================================================
 * typeaheadmap.js based on bootstrap-typeahead.js v2.2.2 which you can find at
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * and is Copyright 2012 Twitter, Inc.
 *
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
/*
 * 
 * My Changes: instead of an array with elements, provide an array with objects. 
 * Define the key and value. The key is the element shown in the inputbox that has typeheadmap.
 * The combination of the key and value is shown in the dropdown.
 * Optionally provide a listener to listen to the selected 'key' and 'value'.
 * https://github.com/redlab/bootstrap-ext
 * 
 * 
 * @version 1.0.2
*/

!function($){

  "use strict"; // jshint ;_;


 /* TYPEAHEADMAP PUBLIC CLASS DEFINITION
  * ================================= */

  var Typeaheadmap = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeaheadmap.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.updater = this.options.updater || this.updater
    this.$menu = $(this.options.menu)
    this.source = this.options.source
    this.shown = false
    this.key = this.options.key
    this.value = this.options.value
    this.listener = this.options.listener || this.listener
    this.displayer = this.options.displayer || this.displayer
    this.notfound = this.options.notfound || new Array()
    this.listen()
  }

  Typeaheadmap.prototype = {

    constructor: Typeaheadmap
  , listener : function(k,v,element) {}
  , select: function () {
	  var selected = this.$menu.find('.active')
      var val = selected.attr('data-key')
      var item = selected.data("data");
      this.listener(val, selected.attr('data-value'), this.$element)
      this.$element
        .val(this.updater(item))
        .change()
      return this.hide()
    }

  , updater: function (item) {
      return item[this.key]
    }

  , show: function () {
      var pos = $.extend({}, this.$element.position(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu.insertAfter(this.$element).css({
        top: pos.top + pos.height
      , left: pos.left
      }).show()

      this.shown = true
      return this
    }

  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var that = this
        , items
        , q

      this.query = this.$element.val()

      if (!this.query || this.query.length < this.options.minLength) {
        return this.shown ? this.hide() : this
      }
	  items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source

      return items ? this.process(items) : this
  }

  , process: function (items) {
	  var that = this
      items = $.grep(items, function (item) {
        return that.matcher(item)
      })

      items = this.sorter(items)

      if (!items.length) {
        if (this.shown) {
            if (!this.notfound.length) {
        	return this.hide();
            } else {
        	return this.render(this.notfound).show()
            }
        } else {
            return this
        }
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~item[this.key].toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item[this.key].toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item[this.key].indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item, that) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
      return that.displayer(that, item, item[that.key].replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      }))
    }
  , displayer: function(that, item, highlighted) {
	return highlighted + ' ' + item[that.value] 
   }
  , render: function (items) {
      var that = this

      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-key', item[that.key])
        i.attr('data-value', item[that.value])
        i.html(that.highlighter(item, that))
        i.data("data",item)
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
	  var that = this;
      this.$element
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if (this.eventSupported('keydown')) {
        this.$element.on('keydown', $.proxy(this.keydown, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
    }

  , eventSupported: function(eventName) {
      var isSupported = eventName in this.$element
      if (!isSupported) {
        this.$element.setAttribute(eventName, 'return;')
        isSupported = typeof this.$element[eventName] === 'function'
      }
      return isSupported
    }

  , move: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , keydown: function (e) {
      this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [40,38,9,13,27])
      this.move(e)
    }

  , keypress: function (e) {
      if (this.suppressKeyPressRepeat) return
      this.move(e)
    }

  , keyup: function (e) {
	  var that = this;
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
        case 16: // shift
        case 17: // ctrl
        case 18: // alt
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , blur: function (e) {
      var that = this
      setTimeout(function () { that.hide() }, 150)
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
    }

  , mouseenter: function (e) {
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  }


  /* TYPEAHEADMAP PLUGIN DEFINITION
   * =========================== */

  var old = $.fn.typeaheadmap

  $.fn.typeaheadmap = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeaheadmap')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeaheadmap', (data = new Typeaheadmap(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeaheadmap.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeaheadmap dropdown-menu"></ul>'
  , item: '<li></li>'
  , minLength: 1
  }

  $.fn.typeaheadmap.Constructor = Typeaheadmap

 /* TYPEAHEADMAP NO CONFLICT
  * =================== */

  $.fn.typeaheadmap.noConflict = function () {
    $.fn.typeaheadmap = old
    return this
  }



 /* TYPEAHEADMAP DATA-API
  * ================== */

    $(document).on('focus.typeaheadmap.data-api', '[data-provide="typeaheadmap"]', function (e) {
      var $this = $(this)
      if ($this.data('typeaheadmap')) return
      e.preventDefault()
      $this.typeaheadmap($this.data())
    })


}(window.jQuery);
