"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  Paper,
  Divider,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  ArrowForward,
  Code,
  Newspaper,
  Security,
  Analytics,
  Speed,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  // Tech cards data
  const techCards = [
    {
      id: 1,
      title: "News",
      description:
        "Manipalcigna wins top performing health insurance company in Indian award",
      icon: <Newspaper fontSize="large" />,
      image: "https://picsum.photos/200/300",
    },
    {
      id: 2,
      title: "Security",
      description:
        "Prioritize strong authentication, least privilege access and regular security updates",
      icon: <Security fontSize="large" />,
      image: "https://picsum.photos/201/301",
    },
    {
      id: 3,
      title: "Work-performance",
      description:
        "Consistency, efficiency, and a growth mindset drive exceptional work performance",
      icon: <Analytics fontSize="large" />,
      image: "https://picsum.photos/202/303",
    },
    {
      id: 4,
      title: "Performance",
      description:
        "Optimized indexes and use proper filtering to reduce scanned rows",
      icon: <Speed fontSize="large" />,
      image: "https://picsum.photos/201/300",
    },
  ];

  // Features section data
  const features = [
    {
      title: "Automated Workflows",
      description: "Streamline your processes with intelligent automation",
      icon: <Code />,
    },
    {
      title: "Real-time Monitoring",
      description: "Keep track of your systems with instant alerts",
      icon: <Analytics />,
    },
    {
      title: "Secure Infrastructure",
      description: "Enterprise-grade security built into every layer",
      icon: <Security />,
    },
  ];
  return (
    <div>
      <Box sx={{ overflow: "hidden" }}>
        {/* Hero Banner Section */}
        <Box
          sx={{
            position: "relative",
            height: { xs: "auto", md: "100vh" },
            width: "100%",
            minHeight: { xs: "200px", md: "300px" },
            background: "linear-gradient(135deg, #051937 0%, #004d7a 100%)",
            color: "white",
            overflow: "hidden",
            pb: { xs: 8, md: 0 },
          }}
        >
          {/* Animated background elements */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
              opacity: 0.1,
              background: "url(https://picsum.photos/1920/1080)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Geometric shapes for visual interest */}
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "300px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(0,128,128,0.4) 0%, rgba(0,128,128,0) 70%)",
              top: "10%",
              right: "-100px",
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(245,132,31,0.3) 0%, rgba(245,132,31,0) 70%)",
              bottom: "10%",
              left: "-50px",
              zIndex: 1,
            }}
          />

          <Container
            maxWidth="xl"
            sx={{ height: "100%", position: "relative", zIndex: 2 }}
          >
            <Grid
              container
              spacing={4}
              alignItems="center"
              sx={{
                height: "100%",
                pt: { xs: 8, md: 0 },
              }}
            >
              {/* Left side - Quote and CTA */}
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      fontSize: { xs: "2.5rem", md: "3.5rem" },
                      background:
                        "linear-gradient(90deg, #ffffff 0%,rgb(69, 215, 215) 100%)",
                      backgroundClip: "text",
                      textFillColor: "transparent",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    MCHI - Spark
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      fontStyle: "italic",
                      mb: 4,
                      color: "#e0e0e0",
                      borderLeft: "4px solid #008080",
                      pl: 2,
                    }}
                  >
                    "The advance of technology is based on making it fit in so
                    that you don't really even notice it, so it's part of
                    everyday life."
                    <Typography
                      variant="body1"
                      sx={{ mt: 1, color: "#b0b0b0" }}
                    >
                      — Bill Gates
                    </Typography>
                  </Typography>

                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForward />}
                      sx={{
                        bgcolor: "#008080",
                        "&:hover": {
                          bgcolor: "#006666",
                        },
                        px: 4,
                        py: 1.5,
                        borderRadius: "30px",
                      }}
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        color: "white",
                        borderColor: "white",
                        "&:hover": {
                          borderColor: "#008080",
                          bgcolor: "rgba(0, 128, 128, 0.1)",
                        },
                        px: 4,
                        py: 1.5,
                        borderRadius: "30px",
                      }}
                    >
                      Learn More
                    </Button>
                  </Box>
                </Box>
              </Grid>

              {/* Right side - Semi-transparent cards */}
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  {techCards.map((card, index) => (
                    <Grid item xs={12} sm={6} key={card.id}>
                      <Card
                        sx={{
                          bgcolor: "rgba(255, 255, 255, 0.1)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          borderRadius: "16px",
                          overflow: "hidden",
                          transition: "all 0.3s ease",
                          transform:
                            index % 2 ? "translateY(20px)" : "translateY(0)",
                          "&:hover": {
                            transform: "translateY(-10px)",
                            boxShadow: "0 12px 20px rgba(0, 0, 0, 0.2)",
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="140"
                          image={card.image}
                          alt={card.title}
                        />
                        <CardContent sx={{ position: "relative" }}>
                          <Box
                            sx={{
                              position: "absolute",
                              top: -30,
                              left: 20,
                              bgcolor: "#008080",
                              borderRadius: "50%",
                              p: 1,
                              color: "white",
                            }}
                          >
                            {card.icon}
                          </Box>
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: "white", mt: 1 }}
                          >
                            {card.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#e0e0e0" }}>
                            {card.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Features Section */}
        <Box sx={{ py: 10, bgcolor: "#f5f5f5" }}>
          <Container>
            <Typography
              variant="h3"
              component="h2"
              align="center"
              sx={{
                mb: 6,
                fontWeight: 700,
                color: "#333",
              }}
            >
              Features/Birthday section
            </Typography>

            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      borderRadius: "16px",
                      bgcolor: "white",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                        transform: "translateY(-5px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "#008080",
                        color: "white",
                        p: 2,
                        borderRadius: "50%",
                        mb: 2,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{ mb: 2, fontWeight: 600 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Stats Section */}
        <Box
          sx={{
            py: 8,
            bgcolor: "#008080",
            color: "white",
          }}
        >
          <Container>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h3"
                    component="div"
                    sx={{ fontWeight: 700 }}
                  >
                    500+
                  </Typography>
                  <Typography variant="body1">Clients Worldwide</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h3"
                    component="div"
                    sx={{ fontWeight: 700 }}
                  >
                    98%
                  </Typography>
                  <Typography variant="body1">Customer Satisfaction</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h3"
                    component="div"
                    sx={{ fontWeight: 700 }}
                  >
                    24/7
                  </Typography>
                  <Typography variant="body1">Technical Support</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h3"
                    component="div"
                    sx={{ fontWeight: 700 }}
                  >
                    15+
                  </Typography>
                  <Typography variant="body1">Years of Experience</Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            py: 10,
            bgcolor: "#f5f5f5",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
              opacity: 0.05,
              background:
                "url(https://source.unsplash.com/random/1920x1080/?digital,network)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <Container sx={{ position: "relative", zIndex: 2 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography
                  variant="h3"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: "#333",
                  }}
                >
                  Ready to Transform Your Business?
                </Typography>
                <Typography variant="h6" sx={{ mb: 4, color: "#666" }}>
                  Join hundreds of companies that have already taken the leap
                  into the future of technology.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    bgcolor: "#008080",
                    "&:hover": {
                      bgcolor: "#006666",
                    },
                    px: 4,
                    py: 1.5,
                    borderRadius: "30px",
                  }}
                >
                  Get Started Today
                </Button>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box
                  component="img"
                  src="https://source.unsplash.com/random/600x400/?technology,future"
                  alt="Technology future"
                  sx={{
                    width: "100%",
                    borderRadius: "16px",
                    boxShadow: "0 16px 32px rgba(0, 0, 0, 0.15)",
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </div>
  );
};

export default LandingPage;
