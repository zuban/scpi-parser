
PROG = client

SRCS = client.c 

.PHONY: clean all

all: $(PROG)

OBJS = $(SRCS:.c=.o)

.c.o:
	$(CC) -c $(CFLAGS) $(CPPFLAGS) -o $@ $<

$(PROG): $(OBJS)
	$(CC) -o $@ $(OBJS) $(CFLAGS) $(LDFLAGS)

clean:
	$(RM) $(PROG) $(OBJS)
