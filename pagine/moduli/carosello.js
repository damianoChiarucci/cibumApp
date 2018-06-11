<Carousel sneak={40} style={styles.carousel2} >
              {this.state.data.map( item =>
              
              <TouchableOpacity 
              key={item.id} 
              style={styles.containerCard}
              onPress={() =>
                this.props.navigation.navigate('DettaglioRicetta',{         
                  nome: item.nome,
                  ingredienti: item.ingredienti,
                  procedimento: item.procedimento,
                  cottura: item.cottura,
                  dosi: item.dosi,
                  costo: item.costo,
                  difficolta: item.difficolta,
                  foto: item.foto,
                  tempoPreparazione: item.tempoPreparazione
              })
              }
              >
                
                  <ImageBackground
                      style={styles.imgBg}
                      resizeMode="cover"
                      source={{ uri: `https://damianochiarucci.altervista.org/images/${item.foto}` }}
                  >
                  <View
                      style={styles.badge}
                      >
                        <Ionicons
                          name={'md-alarm'}
                          size={15}
                          style={{ color: '#fff', paddingRight:5}}
                        />
                        <Text style={styles.badgeText}>{item.cottura} min</Text>
                      </View>
                    <View style={styles.titleBg}>
                      <Text style={styles.title}>{item.nome}</Text>
                      
                    </View>
                </ImageBackground>
              </TouchableOpacity>
              )}
            </Carousel>