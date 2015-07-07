.PHONY: clean all test

all:
	$(MAKE) -C libscpi
	$(MAKE) -C backend
	$(MAKE) -C client

clean:
	$(MAKE) clean -C libscpi
	$(MAKE) clean -C backend
	$(MAKE) clean -C client

test:
	$(MAKE) test -C libscpi