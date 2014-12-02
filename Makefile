all: static/site.css

static/site.css: static/site.less
	lessc $+ | cleancss --keep-line-breaks --skip-advanced -o $@
