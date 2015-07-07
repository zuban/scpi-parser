.PHONY: clean all test

all:
	$(MAKE) -C libscpi
	$(MAKE) -C backend

clean:
	$(MAKE) clean -C libscpi
	$(MAKE) clean -C backend

test:
	$(MAKE) test -C libscpi