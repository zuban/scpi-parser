QT += core gui network 

QT_SRCS += ../common/scpi-def.c
QMAKE_CXXFLAGS += -Wextra -Wmissing-prototypes -Wimplicit -I ../libscpi/inc/
QMAKE_LFLAGS += ../libscpi/dist/libscpi.a -Wl,--as-needed


HEADERS       = server.h
SOURCES       = server.cpp \
                main.cpp

# install
target.path = $$[QT_INSTALL_EXAMPLES]/network/fortuneserver
INSTALLS += target